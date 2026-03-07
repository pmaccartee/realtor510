import agentImg from "@assets/PJM_HEADSHOT_light_touch_1772926722025.png";

export default function Agent() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative px-4 sm:px-0">
            <div className="absolute -inset-4 bg-secondary transform rotate-2 z-0 border border-border"></div>
            <img src={agentImg} alt="Patrick MacCartee" className="relative z-10 w-full h-[600px] object-cover shadow-2xl" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground leading-tight">
              Analytical Focus.<br />
              <span className="italic text-primary">Hospitality Heart.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
              <p>
                Patrick MacCartee brings a rare blend of analytical rigor and service-driven instinct to Bay Area real estate. With 15 years in corporate leadership, including running a multi-billion-dollar product line at Intel, and additional experience in hospitality, development, and sales, Patrick approaches real estate with precision, creativity, and calm.
              </p>
              <p>
                Educated in finance and supply chain management, with an Executive MBA from Haas focused on pricing and auction theory, he helps clients navigate complex markets with clarity, confidence, and results.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="border-t border-primary/20 pt-4">
                <h3 className="font-serif text-xl mb-2 text-foreground">Strategic Sales</h3>
                <p className="text-sm text-muted-foreground">Data-driven pricing strategies and market analysis.</p>
              </div>
              <div className="border-t border-primary/20 pt-4">
                <h3 className="font-serif text-xl mb-2 text-foreground">Curated Search</h3>
                <p className="text-sm text-muted-foreground">Access to off-market opportunities.</p>
              </div>
              <div className="border-t border-primary/20 pt-4">
                <h3 className="font-serif text-xl mb-2 text-foreground">Investment Focus</h3>
                <p className="text-sm text-muted-foreground">Identifying value-add and appreciation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
