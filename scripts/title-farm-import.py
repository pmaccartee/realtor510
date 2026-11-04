# Title-company FARM export -> D1 (mls-sales-db) import builder.
# Usage: python3 scripts/title-farm-import.py <dir with FARM *.csv> <out dir>
# Writes 00_ddl.sql (title_parcels, title_parcel_farms, title_imports, v_title_mls),
# p*.sql (parcel upserts), f*.sql (farm tags), z_imports.sql. Then:
#   for f in out/*.sql; do npx wrangler d1 execute mls-sales-db --remote --file="$f"; done
# Title data lives in its own title_* tables; it never writes to the MLS listings tables.
# Loader: POST each file to the D1 /query API (CLOUDFLARE_API_TOKEN, D1 Edit) or use wrangler as above.
# Keyed on property_key ("street|unit|zip", same as MLS properties) because the exports'
# dash-stripped APNs collide across different parcels. Add new farm files to FARMS.
import csv,glob,re,json,sys,os
from datetime import date
SRC=sys.argv[1]; OUT=sys.argv[2]
FARMS={
 'FARM Lwr Montclar-Piedmont N of Oak Ave-Pied Ave.csv':('lower-montclair-piedmont','Lower Montclair-Piedmont (N of Oakland Ave/Piedmont Ave)'),
 'FARM Montclair North of Snake Rd.csv':('montclair-north-snake-rd','Montclair North of Snake Rd'),
 'FARM Montclair South of Snake Rd.csv':('montclair-south-snake-rd','Montclair South of Snake Rd'),
 'FARM Rockridge Fairview Park.csv':('rockridge-fairview-park','Rockridge-Fairview Park'),
 'FARM Shafter & Lower Rockridge.csv':('shafter-lower-rockridge','Shafter & Lower Rockridge'),
 'FARM Upper Rockridge.csv':('upper-rockridge','Upper Rockridge'),
 'my_farm_10.csv':('piedmont-east','Piedmont East'),
 'my_farm_11.csv':('piedmont-west','Piedmont West'),
}
def money(v):
    v=re.sub(r'[$,\s]','',v or '');
    try: n=int(float(v)); return n or None
    except: return None
def num(v,f=int):
    v=re.sub(r'[,\s]','',v or '')
    try: n=f(v); return n
    except: return None
def iso(d):
    m=re.match(r'(\d{1,2})/(\d{1,2})/(\d{4})',d or '')
    return f"{m[3]}-{int(m[1]):02d}-{int(m[2]):02d}" if m else None
def t(v): v=(v or '').strip(); return v or None
def norm(s): return re.sub(r'\s+',' ',re.sub(r'[^a-z0-9 ]','',(s or '').lower())).strip()
today=date.today().isoformat()
parcels={}; farms=set(); imports=[]
ONLY=set(sys.argv[3:]) or None
for fn,(fk,fname) in FARMS.items():
    if ONLY and fn not in ONLY: continue
    rows=list(csv.DictReader(open(os.path.join(SRC,fn),encoding='utf-8',errors='replace')))
    imports.append((fn,fk,len(rows)))
    for x in rows:
        num_=t(x['Site Address House Number']) or ''; pre=t(x['Site Address Street Prefix'])
        street=' '.join(p for p in [num_,pre,t(x['Site Address Street Name'])] if p).title()
        street=re.sub(r'\b(\d+)(St|Nd|Rd|Th)\b',lambda m:m[1]+m[2].lower(),street)
        unit=t(x['Site Address Unit Number']) or ''
        zip4=t(x['Site Address Zip+4']) or ''; z=zip4[:5]
        pk=f"{street.lower()}|{unit.lower()}|{z}"
        mail=t(x['Full Mail Address']); mzip=(t(x['Mail Address Zip+4']) or '')[:5]
        absentee=None if not mail else int(not (norm(mail)==norm(street) and mzip==z))
        rec=dict(property_key=pk, city_key=f"{street.lower()}|{unit.lower()}|{(t(x['Site Address City']) or '').lower()}", apn=t(x['Parcel Number']), address=street, unit=unit or None,
          city=t(x['Site Address City']), zip=z, zip4=zip4 or None,
          owner_name=t(x['Owner Name']), owner1_first=t(x['Owner1 First Name']), owner1_middle=t(x['Owner1 Middle Name']),
          owner1_last=t(x['Owner1 Last Name']), owner2_first=t(x['Owner2 First Name']), owner2_middle=t(x['Owner2 Middle Name']),
          owner2_last=t(x['Owner2 Last Name']), mail_address=mail, mail_city=t(x['Mail Address City']),
          mail_state=t(x['Mail Address State']), mail_zip=t(x['Mail Address Zip+4']), absentee=absentee,
          owner_occupied=t(x['Owner Occupied']), homeowner_exemption=t(x['Tax Exemption Code']),
          use_code=t(x['Use Code Description']), building_sqft=num(x['Building Area']) or None, rooms=num(x['Rooms']),
          beds=num(x['Bedrooms']), baths=num(x['Bathrooms'],float), stories=num(x['Number Of Stories']),
          units=num(x['Number Of Units']), pool=t(x['Pool']), lot_sqft=num(x['Lot Area SQFT']) or None,
          year_built=num(x['Year Built']) or None, last_sale_price=money(x['Sales Price']),
          last_sale_date=iso(x['Sale Date']), last_sale_doc=t(x['Sales Document Number']),
          sale_price_code=t(x['Prior Sales Price Code']), prior_sale_price=money(x['Prior Sales Price']),
          assessed_land=money(x['Assessed Land Value']), assessed_improvement=money(x['Assessed Improvement Value']),
          years_owned=num(x['Years In Proper'],float), source_file=fn)
        rec['assessed_total']=(rec['assessed_land'] or 0)+(rec['assessed_improvement'] or 0) or None
        old=parcels.get(pk)
        if not old or (rec['last_sale_date'] or '')>(old['last_sale_date'] or ''): parcels[pk]=rec
        farms.add((pk,fk,fname))
COLS=list(next(iter(parcels.values())).keys())
def q(v):
    if v is None: return 'NULL'
    if isinstance(v,(int,float)): return repr(v)
    return "'"+str(v).replace("'","''")+"'"
ddl=f"""CREATE TABLE IF NOT EXISTS title_parcels (
  property_key TEXT PRIMARY KEY, city_key TEXT, apn TEXT, address TEXT, unit TEXT, city TEXT, zip TEXT, zip4 TEXT,
  owner_name TEXT, owner1_first TEXT, owner1_middle TEXT, owner1_last TEXT, owner2_first TEXT, owner2_middle TEXT, owner2_last TEXT,
  mail_address TEXT, mail_city TEXT, mail_state TEXT, mail_zip TEXT, absentee INTEGER, owner_occupied TEXT, homeowner_exemption TEXT,
  use_code TEXT, building_sqft INTEGER, rooms INTEGER, beds INTEGER, baths REAL, stories INTEGER, units INTEGER, pool TEXT,
  lot_sqft INTEGER, year_built INTEGER, last_sale_price INTEGER, last_sale_date TEXT, last_sale_doc TEXT, sale_price_code TEXT,
  prior_sale_price INTEGER, assessed_land INTEGER, assessed_improvement INTEGER, years_owned REAL, source_file TEXT,
  assessed_total INTEGER, first_seen TEXT, last_updated TEXT);
CREATE INDEX IF NOT EXISTS idx_title_parcels_apn ON title_parcels(apn);
CREATE INDEX IF NOT EXISTS idx_title_parcels_city_key ON title_parcels(city_key);
CREATE INDEX IF NOT EXISTS idx_title_parcels_zip ON title_parcels(zip);
CREATE INDEX IF NOT EXISTS idx_title_parcels_owner ON title_parcels(owner1_last);
CREATE TABLE IF NOT EXISTS title_parcel_farms (property_key TEXT NOT NULL, farm_key TEXT NOT NULL, farm_name TEXT, first_seen TEXT,
  PRIMARY KEY (property_key, farm_key));
CREATE TABLE IF NOT EXISTS title_imports (id INTEGER PRIMARY KEY AUTOINCREMENT, file_name TEXT, farm_key TEXT, received_at TEXT, rows_in INTEGER, parcels_after INTEGER, note TEXT);
CREATE INDEX IF NOT EXISTS idx_listings_property_key ON listings(property_key);
-- Most MLS rows have no zip and are keyed street|unit|city, so match on either key.
DROP VIEW IF EXISTS v_title_mls;
CREATE VIEW v_title_mls AS SELECT t.*, l.mls_number, l.status, l.list_price, l.sold_price, l.list_date, l.close_date, l.list_agent, l.list_office, l.sell_agent, l.sell_office FROM title_parcels t LEFT JOIN listings l ON l.property_key IN (t.property_key, t.city_key);
"""
open(f'{OUT}/00_ddl.sql','w').write(ddl)
allc=COLS+['first_seen','last_updated']
upd=','.join(f"{c}=excluded.{c}" for c in COLS+['last_updated'])
recs=list(parcels.values()); chunk=[]; size=0; n=0
def flush():
    global chunk,size,n
    if not chunk: return
    sql=f"INSERT INTO title_parcels ({','.join(allc)}) VALUES\n"+",\n".join(chunk)+f"\nON CONFLICT(property_key) DO UPDATE SET {upd};"
    n+=1; open(f'{OUT}/p{n:03d}.sql','w').write(sql); chunk=[]; size=0
for r in recs:
    v='('+','.join(q(r[c]) for c in COLS)+f",'{today}','{today}')"
    if size+len(v)>85000: flush()
    chunk.append(v); size+=len(v)
flush()
fl=sorted(farms); k=0
for i in range(0,len(fl),800):
    k+=1; vals=",".join(f"({q(a)},{q(b)},{q(c)},'{today}')" for a,b,c in fl[i:i+800])
    open(f'{OUT}/f{k:03d}.sql','w').write(f"INSERT OR IGNORE INTO title_parcel_farms (property_key,farm_key,farm_name,first_seen) VALUES {vals};")
imp=",".join(f"({q(a)},{q(b)},'{today}',{c},{len(parcels)},{q(None)})" for a,b,c in imports)
open(f'{OUT}/z_imports.sql','w').write(f"INSERT INTO title_imports (file_name,farm_key,received_at,rows_in,parcels_after,note) VALUES {imp};")
print(len(parcels),'parcels',len(fl),'farm tags', n,'parcel chunks',k,'farm chunks')
