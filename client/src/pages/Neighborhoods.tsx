import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Note: Ensure the images are properly imported if using Vite aliases, or placed in public
import crockerImg from "../assets/images/crocker-highlands.jpg";
import piedmontImg from "../assets/images/piedmont.jpeg";
import temescalImg from "../assets/images/temescal.jpg";
import rockridgeImg from "../assets/images/rockridge.webp";
import oakmoreImg from "../assets/images/oakmore.jpg";
import montclairImg from "../assets/images/montclair.jpeg";
import clevelandImg from "../assets/images/cleveland-heights.webp";
import berkeleyImg from "../assets/images/berkeley.webp";

const neighborhoods = [
  {
    name: "Crocker Highlands",
    image: crockerImg,
    description: "One of Oakland's most beloved historic districts, Crocker Highlands was designed in the early 1900s as a model garden suburb — curving streets, mature trees, and handsome period architecture built to last. The neighborhood has kept its storybook character intact, and today it pairs that quiet beauty with top-rated schools, walkable access to Lakeshore and Grand Avenue, and a genuine sense of community."
  },
  {
    name: "Piedmont",
    image: piedmontImg,
    description: "Fully surrounded by Oakland yet governed entirely on its own terms, Piedmont has long been one of the East Bay's most coveted addresses. What began as a fashionable residential enclave remains just that — manicured streets, exceptional public schools, and a small-town atmosphere that somehow sits minutes from everything the city has to offer."
  },
  {
    name: "Temescal",
    image: temescalImg,
    description: "Temescal has been reinventing itself since before Oakland was Oakland — from Peralta farmland to streetcar suburb to one of the East Bay's most energetic urban neighborhoods. Today it's all craft coffee, serious restaurants, indie retail, and BART access that makes leaving the car behind an easy choice."
  },
  {
    name: "Rockridge",
    image: rockridgeImg,
    description: "Named for the rocky outcrops left behind by the Hayward Fault, Rockridge has traded its industrial origins for one of the most livable streetscapes in the Bay Area. College Avenue anchors it all — cafés, boutiques, Market Hall, and BART — and the surrounding residential streets are as good as Oakland gets."
  },
  {
    name: "Oakmore",
    image: oakmoreImg,
    description: "Oakmore feels like a secret the rest of Oakland hasn't fully discovered. Built in the 1920s and 30s as a hillside commuter retreat, it retains that tucked-away quality — quiet streets, charming architecture, and the landmark Leimert Bridge connecting it all. Glenview and Dimond dining are right next door, and Highway 13 keeps the rest of the region within easy reach."
  },
  {
    name: "Montclair",
    image: montclairImg,
    description: "Montclair's hills were once logged for redwood. Now they're shaded by it. What grew up in its place is a forested neighborhood centered on a genuine village — cafés, markets, and a pace of life that feels closer to a mountain town than a major city. The fact that downtown Oakland and the freeway are minutes away never quite feels real until you're already there."
  },
  {
    name: "Cleveland Heights",
    image: clevelandImg,
    description: "Perched above Lake Merritt with some of the best views in Oakland, Cleveland Heights offers central location without the noise. The 1920s Cleveland Cascade stairway and fountain is a neighborhood landmark, and easy walks to Lakeshore and Grand Avenue make daily life here effortlessly connected."
  },
  {
    name: "Berkeley",
    image: berkeleyImg,
    description: "Berkeley incorporated in 1878 around a university that would shape it forever — intellectually restless, culturally rich, and endlessly interesting. Today it's one of the most walkable, food-forward cities in California, with historic neighborhoods, strong schools, and Bay views that remind you exactly where you are."
  }
];

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
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
              {neighborhoods.map((n, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="overflow-hidden h-[300px] mb-6 shadow-md border border-border">
                    <img 
                      src={n.image} 
                      alt={n.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-3xl font-serif text-foreground mb-4 group-hover:text-primary transition-colors">
                    {n.name}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    {n.description}
                  </p>
                  <button className="text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                    Explore {n.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
