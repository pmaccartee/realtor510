import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImg from "@assets/002-1015-warfield-avenue.80998.p4k.001.web_1772922978781.jpg";

export default function Sell() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="relative flex items-center justify-center h-[60vh] min-h-[400px]">
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt="Beautiful classic home exterior" className="w-full h-full object-cover object-center" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-md">
              Selling Your Home
            </h1>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
              Smart pricing.<br />
              <span className="italic text-primary">Thoughtful negotiation.</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-16 max-w-3xl mx-auto">
              Strategic pricing, data-driven marketing, and expert negotiation to get the highest possible return for your East Bay property.
            </p>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed mb-8">
              I am committed to exceeding my sellers' expectations. My comprehensive marketing strategy is built to position your home for maximum value—achieving the highest possible price in the shortest amount of time, with the strongest terms.
            </p>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
              With discretion, diligence, and careful attention to detail, I manage every step of the process with intention and precision.
            </p>
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm flex flex-col">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Data Analysis</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  We go beyond simple comps. We analyze micro-market trends, buyer demand signals, and inventory velocity to pinpoint the perfect pricing strategy.
                </p>
              </div>

              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm flex flex-col">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Preparation</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  From targeted renovations to high-end staging, we manage the entire preparation process to ensure your home makes an unforgettable first impression.
                </p>
              </div>

              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm flex flex-col">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Marketing</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Professional photography, cinematic video, and targeted digital campaigns that reach qualified buyers locally and globally.
                </p>
              </div>

              <div className="bg-secondary p-8 border-t-2 border-primary shadow-sm flex flex-col">
                <svg className="h-8 w-8 text-primary mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h3 className="text-2xl font-serif text-foreground mb-4">Negotiation</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Leveraging competition to secure the best terms. We don't just accept offers—we optimize them to protect your equity.
                </p>
              </div>
            </div>
            
            <div className="mt-20 text-center flex flex-col items-center">
              <h3 className="text-2xl font-serif mb-6">Schedule a Valuation</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:5108594895" className="bg-primary text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg text-center">
                  Call (510) 859-4895
                </a>
                <a href="mailto:patrick@realtor510.com" className="bg-secondary text-foreground border-2 border-border px-8 py-4 text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors shadow-sm text-center">
                  Email patrick@realtor510.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
