import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

const insights = [
  {
    category: "Market Intelligence",
    title: "Are We in a Buyer’s Market or Seller’s Market—and Why That’s the Wrong Question",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Are Cash Buyers Still Dominating the $2M+ Market?",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "What are the new reporting requirements for all-cash home purchases starting March 1, 2026?",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How Interest Rate Changes Really Affect High‑Net‑Worth Buyers",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How Seasonality Has Shifted in the East Bay Post‑2020",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "What’s Actually Driving Demand in East Bay Luxury Right Now?",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why “Days on Market” Is a Misleading Metric in Luxury Real Estate",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why Some Homes Sell Quietly—and Others Don’t",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The New Psychology of Luxury Buyers in the East Bay",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Role of Auction Theory in Luxury Home Pricing",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "What a Strategic Price Reduction Actually Looks Like",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How Proposition 19 Changed the Downsizing Equation",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How to Coordinate a Sale and Purchase Without Stress",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Selling the Family Home Without Regret",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Hidden Costs of Waiting Too Long to Sell",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "What Downsizers Should Know About Today’s Buyer Expectations",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why the East Bay Luxury Market Is Different Than SF",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "What It Actually Takes to Get Multiple Offers Today",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why Most Remodels Don’t Deliver the ROI You Expect",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Real Reason Some Homes Sit on the Market",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How to Handle Pre-Emptive Offers",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "When Off-Market Makes Sense and When It Costs You Money",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Truth About Zestimates in Luxury Markets",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why Buyer Letters Don’t Work (And What Does)",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How to Read a Disclosures Packet Like a Pro",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Art of the Counter Offer",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "What to Expect During the Escrow Process",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How to Evaluate Multiple Offers Beyond the Purchase Price",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why Local Agent Relationships Matter More Than Ever",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Impact of Staging on Luxury Sales",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How to Navigate Appraisal Contingencies",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "The Rise of the Cash-Equivalent Buyer",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "Why Pre-Sale Inspections Are Crucial in the East Bay",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Market Intelligence",
    title: "How to Position a Trust Sale for Maximum Value",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Pricing Strategy",
    title: "How I Decide When to “Test” the Market—and When Not To",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Pricing Strategy",
    title: "How I Think About Pricing When There Are No True Comps",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Pricing Strategy",
    title: "How Micro‑Location Can Swing Value by Hundreds of Thousands",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Pricing Strategy",
    title: "How to Read Buyer Behavior Before Offers Come In",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Pricing Strategy",
    title: "Why Overpricing Is Still the #1 Seller Mistake",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Pricing Strategy",
    title: "Why the First 14 Days Matter More Than the List Price",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Negotiation",
    title: "How I Handle Aggressive Buyers Without Killing the Deal",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Negotiation",
    title: "How I Read Between the Lines of Buyer Requests",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Negotiation",
    title: "How to Keep Emotions Out of High-Stakes Negotiations",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Negotiation",
    title: "The Difference Between a Good Negotiator and a Great One",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Negotiation",
    title: "When to Walk Away from a Deal",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "Piedmont vs. North Oakland: How Buyers Actually Compare Them",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "What Buyers Notice First During Showings (It’s Not What You Think)",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "What School District Perception Does to Home Value",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "What Today’s Buyers Will Overlook—and What They Won’t",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "Where I See the East Bay Luxury Market Heading Next",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "Why Architecture Matters More Than Ever in Buyer Decisions",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "Why Crocker Highlands Behaves Differently Than Nearby Neighborhoods",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  },
  {
    category: "Local Expertise",
    title: "Why “Turnkey” Means Something Different Today",
    description: "A practical, East Bay–specific breakdown for Oakland, Piedmont, Berkeley, and Alameda sellers and buyers."
  }
];

export default function Answers() {
  const [search, setSearch] = useState("");

  const filteredInsights = insights.filter((insight) => {
    const term = search.toLowerCase();
    return (
      insight.title.toLowerCase().includes(term) ||
      insight.description.toLowerCase().includes(term) ||
      insight.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-secondary py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
                Trends & Insights
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
                Real Estate Decoded.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-light">
                No fluff, just practical Q&A insights for Oakland, Piedmont, Berkeley, and Alameda.
              </p>
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search trends, topics, or keywords..."
                  className="w-full pl-10 pr-4 h-12 bg-white border border-border focus:border-primary focus:outline-none rounded-none text-base shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {filteredInsights.length > 0 ? (
              <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {filteredInsights.map((insight, index) => (
                  <div key={index} className="group cursor-pointer flex flex-col h-full">
                    <div className="flex flex-col flex-grow border-t border-primary/20 pt-6">
                      <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">
                        {insight.category}
                      </div>
                      <h3 className="text-2xl font-serif leading-tight mb-3 group-hover:underline decoration-1 underline-offset-4 text-foreground">
                        {insight.title}
                      </h3>
                      <p className="text-muted-foreground font-light mb-6 flex-grow line-clamp-3">
                        {insight.description}
                      </p>
                      <div className="flex items-center text-sm font-bold mt-auto group-hover:translate-x-2 transition-transform duration-300 text-foreground uppercase tracking-widest">
                        Read Insight <ArrowRight className="ml-2 h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-serif text-foreground mb-2">No insights found</h3>
                <p className="text-muted-foreground font-light">Try adjusting your search terms or browse all topics.</p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-6 text-sm font-bold border-b-2 border-primary pb-1 text-primary uppercase tracking-widest hover:text-primary/70 hover:border-primary/70 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
