import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Trends() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-4">Market Analysis</span>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-8">
            East Bay Market Trends
          </h1>
          <div className="prose prose-lg prose-neutral max-w-none font-light leading-relaxed text-muted-foreground mb-12">
            <p>
              Understanding the nuanced micro-markets of the East Bay is critical for making informed real estate decisions. We track inventory levels, days on market, and pricing premiums across Oakland, Piedmont, Berkeley, and Alameda.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-border p-8 bg-white shadow-sm">
              <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">Median Sale Price</h3>
              <div className="text-4xl font-serif text-foreground mb-4">$1.25M</div>
              <div className="text-sm text-green-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                +4.2% Year over Year
              </div>
            </div>
            <div className="border border-border p-8 bg-white shadow-sm">
              <h3 className="text-sm tracking-widest uppercase text-muted-foreground mb-2">Average Days on Market</h3>
              <div className="text-4xl font-serif text-foreground mb-4">18 Days</div>
              <div className="text-sm text-blue-600 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                -2 Days from Last Month
              </div>
            </div>
          </div>
          
          <div className="bg-secondary p-8 border-t border-primary/20">
            <h3 className="text-2xl font-serif text-foreground mb-4">Latest Market Insight</h3>
            <p className="font-light text-muted-foreground mb-6">
              Inventory remains tight across prime East Bay neighborhoods. Homes that are properly prepared, aggressively marketed, and priced strategically continue to see multiple offers and significant premiums over asking price. The "flight to quality" trend persists, with turnkey properties commanding the highest attention.
            </p>
            <button className="bg-primary text-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-sm">
              Download Full Q3 Report
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
