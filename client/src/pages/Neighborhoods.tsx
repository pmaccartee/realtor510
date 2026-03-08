import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Neighborhoods() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-primary text-white py-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-md">
              Neighborhoods
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore the distinct communities of the East Bay.
            </p>
          </div>
        </section>
        
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Piedmont */}
              <div className="bg-secondary p-8 border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">Piedmont</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  An independent city surrounded by Oakland, known for its top-rated schools, grand historic homes, and quiet, tree-lined streets.
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                  Explore Piedmont
                </button>
              </div>

              {/* Rockridge */}
              <div className="bg-secondary p-8 border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">Rockridge</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  A highly walkable neighborhood anchored by College Avenue, featuring Craftsman bungalows and some of the East Bay's best dining.
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                  Explore Rockridge
                </button>
              </div>

              {/* Crocker Highlands */}
              <div className="bg-secondary p-8 border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">Crocker Highlands</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Characterized by storybook architecture, winding streets without sidewalks, and a strong sense of community close to Lakeshore Avenue.
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                  Explore Crocker Highlands
                </button>
              </div>

              {/* Berkeley Hills */}
              <div className="bg-secondary p-8 border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">Berkeley Hills</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Offering sweeping views of the San Francisco Bay, winding roads, and significant mid-century modern and organic architecture.
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                  Explore Berkeley Hills
                </button>
              </div>

              {/* Alameda */}
              <div className="bg-secondary p-8 border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">Alameda</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  An island city known for its Victorian homes, historic downtown, beautiful shoreline parks, and laid-back community feel.
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                  Explore Alameda
                </button>
              </div>
              
              {/* Montclair */}
              <div className="bg-secondary p-8 border-t-4 border-primary shadow-sm hover:shadow-md transition-all group">
                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">Montclair</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  Nestled in the Oakland hills with a charming village center, offering a wooded, almost alpine setting just minutes from the city.
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                  Explore Montclair
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
