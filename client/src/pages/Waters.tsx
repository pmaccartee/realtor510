import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Waters() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-primary text-white py-32">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Waters
            </h1>
            <p className="mt-6 text-xl font-light text-white/80 max-w-2xl">
              This is a hidden page.
            </p>
          </div>
        </section>
        
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif text-foreground mb-6">Waters Detail</h2>
              <p className="text-muted-foreground leading-relaxed">
                Add your content for the waters page here.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
