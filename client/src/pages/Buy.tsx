import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Buy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">Find Your Next Home</h1>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Exclusive listings and off-market opportunities in the East Bay's most desirable neighborhoods.
            </p>
          </div>
          
          <div className="bg-white p-8 border border-border shadow-xl max-w-3xl mx-auto animate-in fade-in duration-700 delay-300">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Search by city, neighborhood, or zip code" 
                className="flex-1 border-b border-border p-4 text-lg focus:outline-none focus:border-primary transition-colors bg-transparent"
              />
              <button className="bg-primary text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50">
              {['Piedmont', 'Oakland', 'Berkeley', 'Alameda'].map(city => (
                <button key={city} className="text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors text-left">
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
