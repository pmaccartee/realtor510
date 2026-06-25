import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SchoolMap from "@/components/SchoolMap";
import { useTitle } from "@/hooks/useTitle";
import { useDescription } from "@/hooks/useDescription";

export default function EastBayGuide() {
  useTitle("East Bay Guide | Patrick MacCartee");
  useDescription("A guide to living in the East Bay — neighborhoods, schools, and what to know before you buy, from East Bay realtor Patrick MacCartee.");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-primary text-white py-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-md">
              East Bay Guide
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed">
              Neighborhoods, schools, and everything you need to know about living in the East Bay.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <SchoolMap />
        </section>
      </main>
      <Footer />
    </div>
  );
}
