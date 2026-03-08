import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { insights } from "../data/insights";

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
                  <Link key={index} href={`/answers/${insight.id}`} className="group cursor-pointer flex flex-col h-full block">
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
                  </Link>
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
