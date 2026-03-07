import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Sell() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Discover Your Home's Value</h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Partner with us to navigate the market with our data-driven pricing strategies and luxury marketing.
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-12 border-t-4 border-primary shadow-2xl max-w-3xl mx-auto animate-in fade-in duration-700 delay-300">
            <h3 className="font-serif text-2xl mb-8 text-center">Get a Professional Valuation</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Property Address</label>
                <input 
                  type="text" 
                  className="w-full border-b border-border p-3 focus:outline-none focus:border-primary transition-colors bg-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full border-b border-border p-3 focus:outline-none focus:border-primary transition-colors bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full border-b border-border p-3 focus:outline-none focus:border-primary transition-colors bg-transparent"
                  />
                </div>
              </div>
              
              <div className="pt-6 text-center">
                <button type="submit" className="bg-foreground text-white px-12 py-4 text-sm tracking-widest uppercase hover:bg-primary transition-colors shadow-lg">
                  Request Valuation
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
