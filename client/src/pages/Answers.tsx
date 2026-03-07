import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

const insights = [
  {
    category: "Market Intelligence",
    title: "Are We in a Buyer’s Market or Seller’s Market—and Why That’s the Wrong Question",
    description: "The East Bay isn't one market—it's dozens of micro-markets. We explore how to evaluate your specific neighborhood dynamics rather than relying on broad regional generalizations."
  },
  {
    category: "Market Intelligence",
    title: "Are Cash Buyers Still Dominating the $2M+ Market?",
    description: "A practical, East Bay–specific breakdown of current financing trends, the rise of the cash-equivalent buyer, and how sellers should evaluate contingent versus non-contingent offers."
  },
  {
    category: "Market Intelligence",
    title: "How Interest Rate Changes Really Affect High‑Net‑Worth Buyers",
    description: "Interest rates impact different market segments differently. We analyze how shifting rates influence buying power and psychology in the luxury East Bay market."
  },
  {
    category: "Market Intelligence",
    title: "How Seasonality Has Shifted in the East Bay Post‑2020",
    description: "The traditional Spring and Fall markets have evolved. Learn how to strategically time your sale based on new post-pandemic buyer behavior patterns."
  },
  {
    category: "Pricing Strategy",
    title: "Why “Days on Market” Is a Misleading Metric in Luxury Real Estate",
    description: "High-end properties often follow a different timeline. We discuss why evaluating days on market requires nuance and context in the luxury sector."
  },
  {
    category: "Pricing Strategy",
    title: "How I Think About Pricing When There Are No True Comps",
    description: "Unique homes require unique pricing strategies. Discover our analytical approach to valuing architecturally significant or highly customized properties."
  },
  {
    category: "Pricing Strategy",
    title: "How Micro‑Location Can Swing Value by Hundreds of Thousands",
    description: "In the East Bay, a few blocks can change everything. We break down the hyper-local factors that drive significant premium pricing."
  },
  {
    category: "Negotiation",
    title: "How to Read Buyer Behavior Before Offers Come In",
    description: "The velocity of disclosure downloads, return visits, and specific agent questions—these leading indicators help us predict offer strength and volume."
  },
  {
    category: "Local Expertise",
    title: "Piedmont vs. North Oakland: How Buyers Actually Compare Them",
    description: "While Piedmont's schools remain a driver, many luxury buyers are increasingly drawn to the walkability and architectural diversity of North Oakland."
  },
  {
    category: "Local Expertise",
    title: "Why Some Homes Sell Quietly—and Others Don’t",
    description: "An inside look at the mechanics of off-market sales versus public MLS listings, and how to choose the right path for your property."
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
