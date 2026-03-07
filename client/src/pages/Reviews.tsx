import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sm tracking-widest uppercase text-primary font-semibold block mb-4">Client Testimonials</span>
          <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-12">
            What Our Clients Say
          </h1>
          
          <div className="space-y-12">
            <div className="bg-secondary p-10 border-l-4 border-primary">
              <div className="flex items-center space-x-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground italic mb-6">
                "Patrick's analytical background truly sets him apart. He didn't just tell us what our home was worth; he showed us the data, the strategy, and exactly how we were going to achieve it. The results exceeded our expectations."
              </p>
              <div className="font-medium text-sm tracking-wide uppercase">
                Sarah & James M. — Sold in Piedmont
              </div>
            </div>
            
            <div className="bg-secondary p-10 border-l-4 border-primary">
              <div className="flex items-center space-x-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground italic mb-6">
                "In a highly competitive market, having an agent with corporate negotiation experience was invaluable. Patrick was calm, strategic, and secured us a beautiful home in Berkeley against multiple offers."
              </p>
              <div className="font-medium text-sm tracking-wide uppercase">
                David L. — Bought in Berkeley
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
