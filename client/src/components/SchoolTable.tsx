// The East Bay school ratings + pricing matrix, rendered on /schools (table-only
// page). This is the SAME table as the flagship /east-bay-school-guide page —
// keep the two in sync when medians or ratings change (single source of truth is
// the guide page; /schools carries rel=canonical to it). Styles are scoped under
// .school-matrix so the static page's CSS and the app's Tailwind don't collide.

const TABLE_HTML = `
<style>
  .school-matrix {
    --red: #C01C2C;
    --black: #111111;
    --dark: #1c1c1c;
    --mid: #4a4a4a;
    --muted: #888;
    --rule: #e0ddd8;
    --bg: #ffffff;
    --bg-warm: #faf9f7;
    --r10-bg: #e8f5e1; --r10-text: #2d6016;
    --r9-bg:  #e8f5e1; --r9-text:  #2d6016;
    --r8-bg:  #dceefb; --r8-text:  #0f4b80;
    --r7-bg:  #fef4d8; --r7-text:  #7a5a00;
    --r6-bg:  #f0eeea; --r6-text:  #555;
    --r5-bg:  #f0eeea; --r5-text:  #555;
    --r4-bg:  #fde8e8; --r4-text:  #8b1a1a;
    font-family: 'DM Sans', Arial, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: var(--black);
  }
  .school-matrix .key-section { padding: 8px 0 24px; border-bottom: 1px solid var(--rule); }
  .school-matrix .key-label { font-size: 11px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .school-matrix .key-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .school-matrix .pill { font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 20px; }
  .school-matrix .section-divider { display: flex; align-items: center; gap: 16px; padding: 40px 0 16px; }
  .school-matrix .section-divider h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 500; white-space: nowrap; color: var(--black); margin: 0; }
  .school-matrix .section-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .school-matrix .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .school-matrix table { width: 100%; border-collapse: collapse; font-size: 13.5px; min-width: 700px; }
  .school-matrix thead th { background: var(--black); color: #fff; font-family: 'DM Sans', Arial, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: .07em; text-transform: uppercase; padding: 11px 14px; text-align: left; white-space: nowrap; }
  .school-matrix tbody tr { border-bottom: 1px solid var(--rule); }
  .school-matrix tbody tr:last-child { border-bottom: none; }
  .school-matrix tbody tr:nth-child(even) td { background: var(--bg-warm); }
  .school-matrix tbody tr:nth-child(odd) td { background: var(--bg); }
  .school-matrix tbody td { padding: 14px 14px; vertical-align: top; line-height: 1.45; }
  .school-matrix td.area-cell { font-weight: 500; font-size: 13px; white-space: nowrap; min-width: 140px; }
  .school-matrix td.area-cell .district { display: block; font-size: 11px; font-weight: 400; color: var(--muted); margin-top: 2px; white-space: normal; }
  .school-matrix .school-name { font-weight: 500; font-size: 13px; color: var(--dark); }
  .school-matrix .school-sub { font-size: 11.5px; color: var(--muted); margin-top: 1px; line-height: 1.4; }
  .school-matrix .school-entry { margin-bottom: 9px; }
  .school-matrix .school-entry:last-child { margin-bottom: 0; }
  .school-matrix .badge { display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 12px; margin-left: 5px; vertical-align: middle; white-space: nowrap; font-family: 'DM Sans', Arial, sans-serif; }
  .school-matrix .r10 { background: var(--r10-bg); color: var(--r10-text); }
  .school-matrix .r9  { background: var(--r9-bg);  color: var(--r9-text); }
  .school-matrix .r8  { background: var(--r8-bg);  color: var(--r8-text); }
  .school-matrix .r7  { background: var(--r7-bg);  color: var(--r7-text); }
  .school-matrix .r6  { background: var(--r6-bg);  color: var(--r6-text); }
  .school-matrix .r5  { background: var(--r5-bg);  color: var(--r5-text); }
  .school-matrix .r4  { background: var(--r4-bg);  color: var(--r4-text); }
  .school-matrix .note-line { font-size: 11.5px; color: var(--muted); font-style: italic; margin-top: 4px; line-height: 1.4; }
  .school-matrix .stat-cell { text-align: right; white-space: nowrap; min-width: 80px; }
  .school-matrix .stat-val { font-size: 14px; font-weight: 500; color: var(--dark); display: block; }
  .school-matrix thead th.stat-th { background: #1f1f1f; font-size: 10px; letter-spacing: .06em; text-align: right; white-space: normal; line-height: 1.35; }
  .school-matrix .notes-block { padding: 40px 0 0; border-top: 1px solid var(--rule); margin-top: 40px; }
  .school-matrix .notes-block .notes-title { font-size: 11px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .school-matrix .notes-block ul { list-style: none; display: flex; flex-direction: column; gap: 8px; margin: 0; padding: 0; }
  .school-matrix .notes-block li { font-size: 12.5px; color: var(--mid); line-height: 1.6; padding-left: 16px; border-left: 2px solid var(--rule); }
</style>

<!-- RATING KEY -->
<div class="key-section">
  <div class="key-label">Rating Key</div>
  <div class="key-pills">
    <span class="pill r10">9–10 &nbsp;Excellent</span>
    <span class="pill r8">8 &nbsp;Strong</span>
    <span class="pill r7">7 &nbsp;Good</span>
    <span class="pill r6">6 &nbsp;Below threshold</span>
    <span class="pill r4">≤5 &nbsp;Weak</span>
  </div>
</div>

<!-- SECTION 1 -->
<div class="section-divider">
  <h2>Whole-City Districts &mdash; <em style="font-style:italic; color:var(--mid);">Consistent 7+ at every level</em></h2>
</div>

<div class="table-scroll">
<table>
  <thead>
    <tr>
      <th style="width:13%">Area</th>
      <th class="stat-th" style="width:10%;text-align:right">Median<br>Sale Price</th>
      <th style="width:25%">Elementary</th>
      <th style="width:22%">Middle</th>
      <th style="width:24%">High School</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td class="area-cell">Albany<span class="district">Albany City Unified</span></td>
      <td class="stat-cell"><span class="stat-val">$1.59M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Ocean View, Cornell, Marin, Harding</span>
          <div class="school-sub">K–5 · typically 7–9 range</div>
          <div class="note-line">Ocean View: 2025 CA Distinguished School</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Albany Middle<span class="badge r8">8/10</span></span>
          <div class="school-sub">6–8 · only middle school · top 10% CA</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Albany High<span class="badge r10">10/10</span></span>
          <div class="school-sub">#76 in CA · A+ Niche · 95% grad rate</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Alameda<span class="district">Alameda Unified</span></td>
      <td class="stat-cell"><span class="stat-val">$1.62M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Amelia Earhart Elementary<span class="badge r10">10/10</span></span>
          <div class="school-sub">K–5 · Bay Farm Island · largest elem</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Edison · Frank Otis · Franklin<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–5 · main island</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Bay Farm School<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–8 · covers elem + middle grades</div>
        </div>
        <div class="school-entry">
          <span class="school-name">William G. Paden<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Lincoln Middle<span class="badge r9">9/10</span></span>
          <div class="school-sub">6–8 · Fernside Blvd · top 5% CA</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Will C. Wood Middle<span class="badge r7">7/10</span></span>
          <div class="school-sub">6–8 · Grand St</div>
        </div>
        <div class="note-line">Bay Farm K–8 also covers middle grades</div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Alameda High<span class="badge r10">10/10</span></span>
          <div class="school-sub">A+ Niche · 97% grad rate · SAT avg 1310</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Encinal Jr/Sr High<span class="badge r7">7/10</span></span>
          <div class="school-sub">6–12 · west end · $50M renovation 2021</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Berkeley<span class="district">Berkeley Unified</span></td>
      <td class="stat-cell"><span class="stat-val">$1.74M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Washington<span class="badge r10">10/10</span></span>
          <div class="school-sub">K–5 · North Berkeley</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Oxford · Arts Magnet<span class="badge r9">9/10</span></span>
        </div>
        <div class="school-entry">
          <span class="school-name">Thousand Oaks · Sylvia Mendez<span class="badge r8">8/10</span></span>
          <div class="school-sub">Mendez is dual Spanish/English immersion</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Cragmont · Emerson · John Muir<span class="badge r7">7/10</span></span>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Willard Middle<span class="badge r10">10/10</span></span>
          <div class="school-sub">6–8 · Stuart St</div>
        </div>
        <div class="school-entry">
          <span class="school-name">MLK Jr. · Longfellow<span class="badge r8">8/10</span></span>
          <div class="school-sub">6–8</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Berkeley High<span class="badge r9">9/10</span></span>
          <div class="school-sub">9–12 · only public HS · #213 in CA</div>
        </div>
        <div class="note-line">Lottery/integration system — zone ≠ guarantee</div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Piedmont<span class="district">Piedmont Unified</span></td>
      <td class="stat-cell"><span class="stat-val">$3.23M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Havens · Wildwood<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Beach Elementary<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Piedmont Middle<span class="badge r8">8/10</span></span>
          <div class="school-sub">6–8 · feeds all three elementaries</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Piedmont High<span class="badge r9">9/10</span></span>
          <div class="school-sub">A+ Niche · top 100 nationally · separate city district</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Orinda<span class="district">Orinda Union Elem. +<br>Acalanes HS District</span></td>
      <td class="stat-cell"><span class="stat-val">$2.19M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Los Perales<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Del Rey · Rheem · Glorietta · Wagner Ranch<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Orinda Intermediate<span class="badge r8">8/10</span></span>
          <div class="school-sub">6–8 · only middle school</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Miramonte High<span class="badge r10">10/10</span></span>
          <div class="school-sub">#31 in CA · A+ Niche · 98% grad rate</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Lafayette<span class="district">Lafayette Elem. District +<br>Acalanes HS District</span></td>
      <td class="stat-cell"><span class="stat-val">$2.02M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Burton Valley · Happy Valley · Springhill · Lafayette Elem.<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">M.H. Stanley Middle<span class="badge r7">7/10</span></span>
          <div class="school-sub">6–8 · only middle school</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Acalanes High<span class="badge r10">10/10</span></span>
          <div class="school-sub">#77 in CA · A+ Niche · 97% grad rate</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Moraga<span class="district">Moraga Elem. District +<br>Acalanes HS District</span></td>
      <td class="stat-cell"><span class="stat-val">$2.00M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Los Perales<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Donald Rheem · Camino Pablo<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Joaquin Moraga Intermediate<span class="badge r9">9/10</span></span>
          <div class="school-sub">6–8 · only middle school</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Campolindo High<span class="badge r10">10/10</span></span>
          <div class="school-sub">#30 in CA · A+ Niche · 99% grad rate</div>
        </div>
      </td>
    </tr>

  </tbody>
</table>
</div>

<!-- SECTION 2 -->
<div class="section-divider">
  <h2>Oakland (OUSD) &mdash; <em style="font-style:italic; color:var(--mid);">By neighborhood pipeline</em></h2>
</div>

<div class="table-scroll">
<table>
  <thead>
    <tr>
      <th style="width:16%">Neighborhood</th>
      <th class="stat-th" style="width:10%;text-align:right">Median<br>Sale Price</th>
      <th style="width:24%">Elementary</th>
      <th style="width:22%">Middle</th>
      <th style="width:21%">High School</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td class="area-cell">Upper Rockridge<span class="district">Hillcrest zone</span></td>
      <td class="stat-cell"><span class="stat-val">$2.25M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Hillcrest Elementary<span class="badge r7">7/10</span></span>
          <div class="school-sub">K–8 · only K-8 in OUSD · covers both levels</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Covered by Hillcrest K–8</span>
          <div class="school-sub">or Claremont Middle <span class="badge r7">7/10</span> if not at Hillcrest</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Oakland Technical<span class="badge r8">8/10</span></span>
          <div class="school-sub">A Niche · #557 in CA</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Rockridge<span class="district">Chabot / Peralta zone</span></td>
      <td class="stat-cell"><span class="stat-val">$2.25M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Peralta Elementary<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–5 · Lower Rockridge · oversubscribed</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Chabot Elementary<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5 · Rockridge</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Claremont Middle<span class="badge r7">7/10</span></span>
          <div class="school-sub">6–8 · College Ave at BART</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Oakland Technical<span class="badge r8">8/10</span></span>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Crocker Highlands<span class="district">Trestle Glen area</span></td>
      <td class="stat-cell"><span class="stat-val">$1.96M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Crocker Highlands Elem.<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5 · 2025 CA Distinguished School</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Edna Brewer Middle<span class="badge r7">7/10</span></span>
          <div class="school-sub">6–8 · 13th Ave</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Oakland High<span class="badge r4">4/10</span></span>
          <div class="school-sub">9–12 · zoned HS</div>
          <div class="note-line">Many families pursue lottery transfer to Oakland Tech</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Glenview</td>
      <td class="stat-cell"><span class="stat-val">$1.36M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Glenview Elementary<span class="badge r7">7/10</span></span>
          <div class="school-sub">K–5 · MacArthur Blvd</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Edna Brewer Middle<span class="badge r7">7/10</span></span>
          <div class="school-sub">6–8 · 13th Ave</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Oakland High<span class="badge r4">4/10</span></span>
          <div class="note-line">Many families pursue lottery transfer to Oakland Tech</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Montclair / Thornhill</td>
      <td class="stat-cell"><span class="stat-val">$1.50M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Montclair Elementary<span class="badge r9">9/10</span></span>
          <div class="school-sub">K–5 · Mountain Blvd</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Thornhill Elementary<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–5 · Thornhill Dr</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Montera Middle<span class="badge r6">6/10</span></span>
          <div class="school-sub">6–8 · feeds Skyline HS</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Skyline High<span class="badge r6">6/10</span></span>
          <div class="school-sub">B+ Niche · 45-acre hill campus</div>
        </div>
      </td>
    </tr>

  </tbody>
</table>
</div>

<!-- SECTION 3 -->
<div class="section-divider">
  <h2>El Cerrito &amp; Kensington &mdash; <em style="font-style:italic; color:var(--mid);">WCCUSD: Mixed pipeline</em></h2>
</div>

<div class="table-scroll">
<table>
  <thead>
    <tr>
      <th style="width:16%">Area</th>
      <th class="stat-th" style="width:10%;text-align:right">Median<br>Sale Price</th>
      <th style="width:24%">Elementary</th>
      <th style="width:22%">Middle</th>
      <th style="width:21%">High School</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td class="area-cell">El Cerrito<span class="district">West Contra Costa Unified</span></td>
      <td class="stat-cell"><span class="stat-val">$1.29M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Madera Elementary</span>
          <div class="school-sub">K–6 · highest-rated elem in city · B+ Niche</div>
        </div>
        <div class="school-entry">
          <span class="school-name">Fairmont · Harding<span class="badge r5">5/10</span></span>
          <div class="school-sub">K–6 · most neighborhood elementaries</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Fred T. Korematsu Middle<span class="badge r4">4–5/10</span></span>
          <div class="school-sub">7–8 · below average · #44 most diverse MS in CA</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">El Cerrito Senior High<span class="badge r7">7/10</span></span>
          <div class="school-sub">B+ Niche · 93% grad rate · SAT avg 1260</div>
          <div class="note-line">IT Academy · Media Academy · career pathways</div>
        </div>
      </td>
    </tr>

    <tr>
      <td class="area-cell">Kensington<span class="district">Unincorporated ·<br>West Contra Costa Unified</span></td>
      <td class="stat-cell"><span class="stat-val">$1.80M</span></td>
      <td>
        <div class="school-entry">
          <span class="school-name">Kensington Hilltop Elem.<span class="badge r8">8/10</span></span>
          <div class="school-sub">K–6 · only school in Kensington · CA Distinguished</div>
          <div class="note-line">Test score rating: 10/10 — overall pulled down by equity sub-score. Top-scoring school in all of WCCUSD. 96th percentile in CA.</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">Fred T. Korematsu Middle<span class="badge r4">4–5/10</span></span>
          <div class="school-sub">7–8 · zoned assignment</div>
          <div class="note-line">Many families pursue interdistrict transfers to Albany or Berkeley middle schools</div>
        </div>
      </td>
      <td>
        <div class="school-entry">
          <span class="school-name">El Cerrito Senior High<span class="badge r7">7/10</span></span>
          <div class="school-sub">9–12 · zoned HS for Kensington</div>
          <div class="note-line">Some families transfer to Berkeley High (9/10) via interdistrict permit</div>
        </div>
      </td>
    </tr>

  </tbody>
</table>
</div>

<!-- NOTES -->
<div class="notes-block">
  <p class="notes-title">Notes</p>
  <ul>
    <li>Schools are rated 1–10 based on test scores, college readiness, academic progress, and equity relative to other California schools.</li>
    <li>Oakland Unified uses a neighborhood lottery — zone priority does not guarantee placement. Siblings of enrolled students get first priority.</li>
    <li>Berkeley Unified uses an integration lottery. Placement is by ranked preference within zones, not purely by address.</li>
    <li>Orinda, Lafayette, and Moraga each have separate K–8 elementary districts. After 8th grade, students feed into the Acalanes Union High School District (Miramonte, Acalanes, or Campolindo).</li>
    <li>Piedmont is a separate city and school district geographically surrounded by Oakland. Not part of Oakland Unified.</li>
    <li>Alameda Unified has two HS pipelines: most of the main island feeds into Alameda High (10/10), while the west end feeds into Encinal Jr/Sr High (7/10, grades 6–12).</li>
    <li>El Cerrito WCCUSD ratings are partly dragged down by a high ELL population — parent satisfaction is generally higher than raw numbers suggest. El Cerrito High is the standout at 7/10.</li>
    <li>Crocker Highlands and Glenview families frequently pursue lottery transfers to Oakland Tech to bypass the Oakland High assignment.</li>
  </ul>
</div>
`;

export default function SchoolTable() {
  return (
    <div className="school-matrix" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <div dangerouslySetInnerHTML={{ __html: TABLE_HTML }} />
    </div>
  );
}
