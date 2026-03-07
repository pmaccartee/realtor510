import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-4">Trends & Insights</span>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
            Real Estate Decoded.
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-16 max-w-3xl">
            No fluff, just practical Q&A insights for Oakland, Piedmont, Berkeley, and Alameda.
          </p>
          
          <div className="space-y-12">
            {insights.map((insight, index) => (
              <div key={index} className="border-b border-border pb-12">
                <span className="text-xs font-bold text-primary mb-3 uppercase tracking-wider block">{insight.category}</span>
                <h3 className="text-3xl font-serif text-foreground mb-4">{insight.title}</h3>
                <p className="font-light text-muted-foreground leading-relaxed mb-6">
                  {insight.description}
                </p>
                <button className="text-sm font-bold border-b-2 border-primary pb-1 hover:text-primary/70 hover:border-primary/70 transition-colors uppercase tracking-widest">
                  Read Insight
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
