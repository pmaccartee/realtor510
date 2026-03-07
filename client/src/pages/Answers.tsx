import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Answers() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-4">Insights & FAQ</span>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-12">
            Real Estate Answers
          </h1>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-2xl font-serif text-foreground mb-4">When is the best time to sell in the East Bay?</h3>
              <p className="font-light text-muted-foreground leading-relaxed">
                Traditionally, the Spring and early Fall are the most active seasons in the East Bay market. However, low inventory can make any time of year advantageous if your home is priced and prepared correctly. We provide a customized market analysis to determine the optimal timing for your specific property.
              </p>
            </div>
            
            <div className="border-b border-border pb-8">
              <h3 className="text-2xl font-serif text-foreground mb-4">How do you determine the listing price?</h3>
              <p className="font-light text-muted-foreground leading-relaxed">
                We use a rigorous, data-driven approach analyzing recent comparable sales, active competition, and market trends. Combined with our understanding of buyer psychology and auction theory, we establish a pricing strategy designed to maximize your final sale price.
              </p>
            </div>
            
            <div className="border-b border-border pb-8">
              <h3 className="text-2xl font-serif text-foreground mb-4">What should I do to prepare my home for sale?</h3>
              <p className="font-light text-muted-foreground leading-relaxed">
                Preparation is key. We typically recommend fresh paint, updated lighting, professional deep cleaning, and high-end staging. We will walk through your property and provide a prioritized list of ROI-focused improvements.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
