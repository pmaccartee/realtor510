declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-your-listings': any;
    }
  }
}

export default function CurrentListings() {
  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[0.2em] text-primary uppercase mb-4">Properties</div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Current Listings</h2>
        </div>
        
        {/* RealScout Integration */}
        <div className="w-full bg-white shadow-sm border border-black/5 p-4 min-h-[400px]">
          <realscout-your-listings 
            agent-encoded-id="QWdlbnQtMjUyMzU1" 
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
            listing-status=",For Sale,In Contract" 
            property-types="SFR,MF"
            include-co-listings
            include-seller-listings
          ></realscout-your-listings>
        </div>
      </div>
    </section>
  );
}
