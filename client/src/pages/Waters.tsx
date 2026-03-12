import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { aliceWatersHtml } from "../data/aliceWatersHtml";
import { useTitle } from "@/hooks/useTitle";
import { useDescription } from "@/hooks/useDescription";

export default function Waters() {
  useTitle("Alice Waters Culinary Family Tree | Realtor 510");
  useDescription("Explore the culinary family tree of Alice Waters — the Chez Panisse alumni network and the roots of California cuisine.");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 flex flex-col">
        <iframe 
          srcDoc={aliceWatersHtml} 
          className="w-full flex-1 border-none min-h-[calc(100vh-80px)] bg-white" 
          title="The House That Alice Built"
        />
      </main>
      <Footer />
    </div>
  );
}
