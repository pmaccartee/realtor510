import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SchoolTable from "@/components/SchoolTable";
import { useTitle } from "@/hooks/useTitle";
import { useDescription } from "@/hooks/useDescription";

// /schools — table-only page: the East Bay school ratings + pricing matrix.
// The interactive map lives on the flagship /east-bay-school-guide page (this
// page cross-links to it and carries rel=canonical to it — see prerender.mjs).
export default function EastBayGuide() {
  useTitle("East Bay School Ratings & Home Prices | Patrick MacCartee");
  useDescription("GreatSchools ratings and median home prices for every East Bay school district — Oakland, Berkeley, Albany, Piedmont, Alameda, Orinda, Lafayette, Moraga, El Cerrito, and Kensington — from East Bay realtor Patrick MacCartee.");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-primary text-white py-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-md">
              East Bay Schools
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              GreatSchools ratings and median home prices, district by district.
            </p>
            <a
              href="/east-bay-school-guide"
              className="inline-block bg-white text-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              See the interactive map &rarr;
            </a>
          </div>
        </section>

        <section className="py-24 bg-white">
          <SchoolTable />
        </section>
      </main>
      <Footer />
    </div>
  );
}
