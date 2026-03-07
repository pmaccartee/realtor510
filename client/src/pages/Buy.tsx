import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Buy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-4">For Buyers</span>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-8">
            Find Your Next Home in the East Bay
          </h1>
          <div className="prose prose-lg prose-neutral max-w-none font-light leading-relaxed text-muted-foreground">
            <p>
              Navigating the East Bay real estate market requires strategic insight and deep local knowledge. Whether you are looking for a charming bungalow in Alameda, a classic traditional in Piedmont, or a mid-century home in Oakland, we are here to guide you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div className="border-t border-primary/20 pt-6">
                <h3 className="text-2xl font-serif text-foreground mb-4">Curated Search</h3>
                <p>We leverage our extensive network to provide access to both on-market and exclusive off-market properties that match your specific criteria.</p>
              </div>
              <div className="border-t border-primary/20 pt-6">
                <h3 className="text-2xl font-serif text-foreground mb-4">Strategic Negotiation</h3>
                <p>Utilizing data-driven pricing analysis and auction theory, we ensure you are positioned competitively while protecting your investment.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
