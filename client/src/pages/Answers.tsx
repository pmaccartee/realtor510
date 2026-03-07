import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Answers() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Expert Answers</h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Real estate is complex. We provide clarity. Ask your questions about the East Bay market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-in fade-in duration-700 delay-200">
              <h2 className="font-serif text-3xl">Frequently Asked</h2>
              
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h4 className="font-medium text-lg mb-2">When is the best time to list my home?</h4>
                  <p className="text-muted-foreground font-light text-sm">In the East Bay, spring and early fall are traditionally the most active seasons, but low inventory means well-priced homes sell year-round.</p>
                </div>
                <div className="border-b border-border pb-4">
                  <h4 className="font-medium text-lg mb-2">How do you determine pricing?</h4>
                  <p className="text-muted-foreground font-light text-sm">We use a rigorous analytical approach, evaluating recent comps, micro-neighborhood trends, and current buyer demand rather than just automated models.</p>
                </div>
                <div className="border-b border-border pb-4">
                  <h4 className="font-medium text-lg mb-2">What repairs yield the highest return?</h4>
                  <p className="text-muted-foreground font-light text-sm">Fresh paint, refinished floors, and professional staging almost universally provide the best ROI. We offer custom prep plans for every property.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-8 border border-border animate-in fade-in duration-700 delay-300">
              <h3 className="font-serif text-2xl mb-6">Ask Patrick Directly</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors bg-white text-sm"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors bg-white text-sm"
                />
                <textarea 
                  placeholder="What's your question about the market?" 
                  rows={4}
                  className="w-full border border-border p-3 focus:outline-none focus:border-primary transition-colors bg-white text-sm resize-none"
                ></textarea>
                <button type="submit" className="w-full bg-primary text-white px-6 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                  Send Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
