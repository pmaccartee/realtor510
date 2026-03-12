import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useTitle } from "@/hooks/useTitle";
import { useDescription } from "@/hooks/useDescription";

import crockerImg from "../assets/images/crocker-highlands.jpg";
import piedmontImg from "../assets/images/piedmont.jpeg";
import temescalImg from "../assets/images/temescal.jpg";
import rockridgeImg from "../assets/images/rockridge.webp";
import oakmoreImg from "../assets/images/oakmore.jpg";
import montclairImg from "../assets/images/montclair.jpeg";
import sequoyahImg from "../assets/images/sequoyah-hills.png";
import berkeleyImg from "../assets/images/berkeley-hills.webp";

const neighborhoods = [
  {
    name: "Crocker Highlands",
    image: crockerImg,
    description: "One of Oakland's most beloved historic districts, Crocker Highlands was designed in the early 1900s as a model garden suburb — curving streets, mature trees, and handsome period architecture built to last. The neighborhood has kept its storybook character intact, and today it pairs that quiet beauty with top-rated schools, walkable access to Lakeshore and Grand Avenue, and a genuine sense of community.",
    link: "/neighborhood/crocker-highlands-guide"
  },
  {
    name: "Piedmont",
    image: piedmontImg,
    description: "Fully surrounded by Oakland yet governed entirely on its own terms, Piedmont has long been one of the East Bay's most coveted addresses. What began as a fashionable residential enclave remains just that — manicured streets, exceptional public schools, and a small-town atmosphere that somehow sits minutes from everything the city has to offer.",
    link: "/neighborhood/piedmont-home-values"
  },
  {
    name: "Temescal",
    image: temescalImg,
    description: "Temescal has been reinventing itself since before Oakland was Oakland — from Peralta farmland to streetcar suburb to one of the East Bay's most energetic urban neighborhoods. Today it's all craft coffee, serious restaurants, indie retail, and BART access that makes leaving the car behind an easy choice.",
    link: "/neighborhood/temescal-guide"
  },
  {
    name: "Sequoyah Hills",
    image: sequoyahImg,
    description: "Tucked away in the hills above the Oak Knoll golf course, Sequoyah Hills is Oakland's hidden mid-century gem. Characterized by expansive lots, distinctive architecture, and sweeping bay views, this tranquil neighborhood feels worlds away from the city while maintaining easy access to major thoroughfares.",
    link: "/neighborhood/sequoyah-hills-market-report"
  },
  {
    name: "Rockridge",
    image: rockridgeImg,
    description: "Named for the rocky outcrops left behind by the Hayward Fault, Rockridge has traded its industrial origins for one of the most livable streetscapes in the Bay Area. College Avenue anchors it all — cafés, boutiques, Market Hall, and BART — and the surrounding residential streets are as good as Oakland gets.",
    link: "/neighborhood/rockridge-guide"
  },
  {
    name: "Oakmore-Glenview",
    image: oakmoreImg,
    description: "Oakmore feels like a secret the rest of Oakland hasn't fully discovered. Built in the 1920s and 30s as a hillside commuter retreat, it retains that tucked-away quality — quiet streets, charming architecture, and the landmark Leimert Bridge connecting it all. Glenview and Dimond dining are right next door, and Highway 13 keeps the rest of the region within easy reach.",
    link: "/neighborhood/oakmore-glenview-guide"
  },
  {
    name: "Montclair",
    image: montclairImg,
    description: "Montclair's hills were once logged for redwood. Now they're shaded by it. What grew up in its place is a forested neighborhood centered on a genuine village — cafés, markets, and a pace of life that feels closer to a mountain town than a major city. The fact that downtown Oakland and the freeway are minutes away never quite feels real until you're already there.",
    link: "/neighborhood/montclair-guide"
  },
  {
    name: "Berkeley Hills",
    image: berkeleyImg,
    description: "The Berkeley Hills offer a unique blend of intellectual energy, architectural significance, and natural beauty. Winding streets reveal sweeping views of the San Francisco Bay, while the architecture ranges from historic brown shingles to mid-century modern masterpieces. Proximity to UC Berkeley gives the area a distinct cultural depth, and the sprawling Regional Parks provide immediate access to nature.",
    link: "/neighborhood/berkeley-hills-guide"
  },
  {
    name: "Trestle Glen",
    image: temescalImg,
    description: "Trestle Glen gives you the feel of Piedmont — the architecture, the quiet, the tree canopy — with the cultural access of Oakland. That combination is genuinely hard to find.",
    link: "/neighborhood/trestle-glen-guide"
  }
];

export default function Neighborhoods() {
  useTitle("East Bay Neighborhoods Guide | Patrick MacCartee");
  useDescription("Explore Oakland, Berkeley, Piedmont, and Alameda neighborhood guides from East Bay realtor Patrick MacCartee.");
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
                <Link key={i} href={n.link || "#"} className={`group block ${n.link ? 'cursor-pointer' : ''} ${i === 0 ? 'md:col-span-2 lg:col-span-2 grid md:grid-cols-2 gap-12 items-center bg-secondary/10 p-0 border border-border overflow-hidden shadow-sm hover:shadow-md transition-all' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={`overflow-hidden shadow-md border border-border ${i === 0 ? 'h-[500px] mb-0 border-none shadow-none w-full' : 'h-[300px] mb-6'}`}>
                    <img 
                      src={n.image} 
                      alt={n.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className={i === 0 ? 'p-12 md:pr-16' : ''}>
                    <h3 className={`font-serif text-foreground mb-4 group-hover:text-primary transition-colors ${i === 0 ? 'text-4xl md:text-5xl mb-6' : 'text-3xl'}`}>
                      {n.name}
                    </h3>
                    <p className={`text-muted-foreground font-light leading-relaxed mb-6 ${i === 0 ? 'text-lg' : ''}`}>
                      {n.description}
                    </p>
                    {n.link ? (
                      <span className="inline-block text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest group-hover:text-primary/70 group-hover:border-primary/70 transition-colors">
                        Explore {n.name}
                      </span>
                    ) : (
                      <span className="inline-block text-sm font-bold border-b-2 border-transparent pb-1 text-muted-foreground uppercase tracking-widest">
                        More info coming soon
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
