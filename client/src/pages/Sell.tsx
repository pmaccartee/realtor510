import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Sell() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-4">For Sellers</span>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-8">
            Maximize Your Property's Value
          </h1>
          <div className="prose prose-lg prose-neutral max-w-none font-light leading-relaxed text-muted-foreground">
            <p>
              Selling a home is a significant financial event. Our approach combines rigorous analytical pricing with high-end, tailored marketing to attract the right buyers and achieve the highest possible return on your investment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm">
                <h3 className="text-xl font-serif text-foreground mb-3">1. Preparation</h3>
                <p className="text-sm">We manage the entire prep process, from strategic renovations to luxury staging, ensuring your home shows flawlessly.</p>
              </div>
              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm">
                <h3 className="text-xl font-serif text-foreground mb-3">2. Marketing</h3>
                <p className="text-sm">Bespoke marketing campaigns, stunning photography, and global reach through The Grubb Company network.</p>
              </div>
              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm">
                <h3 className="text-xl font-serif text-foreground mb-3">3. Negotiation</h3>
                <p className="text-sm">Expert handling of multiple offers and complex terms to secure the best possible outcome for you.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
