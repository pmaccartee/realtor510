import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImg from "@assets/002-1015-warfield-avenue.80998.p4k.001.web_1772922978781.jpg";

export default function Buy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="relative pt-40 pb-32 flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt="Beautiful classic home" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-lg">
              Turning chaos<br />
              <span className="italic text-primary drop-shadow-md">into clear decisions.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-16 max-w-3xl mx-auto drop-shadow-sm">
              Access off-market opportunities and navigate the competitive East Bay market with a strategic partner by your side.
            </p>
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-8 drop-shadow-sm">
              Buying a home is one of the most significant financial and personal decisions you'll make. Choosing the right agent deserves thoughtful consideration—it directly impacts your experience, your leverage, and your outcome.
            </p>
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed drop-shadow-sm">
              I understand that a home purchase touches far more than finances. It affects your family, your lifestyle, your long term goals, and the future you're building. My role is to guide that process with clarity, strategy, and steady execution.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Uncover Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                  The best homes often sell before they hit the open market. We leverage our deep local network to give you early access to upcoming listings.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Off market access
                  </li>
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Neighborhood insights
                  </li>
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Future inventory preview
                  </li>
                </ul>
              </div>

              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Protect Your Interests</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                  We perform rigorous due diligence on every property. From analyzing disclosure packages to coordinating inspections, we ensure you know exactly what you're buying.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Disclosure analysis
                  </li>
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Inspection coordination
                  </li>
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Value assessment
                  </li>
                </ul>
              </div>

              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Win the Deal</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                  In a multiple offer environment, price isn't the only lever. We craft compelling offers with strategic terms that stand out to sellers while protecting you.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Strategic offer terms
                  </li>
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Reputation leverage
                  </li>
                  <li className="flex items-center">
                    <svg className="h-3 w-3 mr-2 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
                    Closing coordination
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
