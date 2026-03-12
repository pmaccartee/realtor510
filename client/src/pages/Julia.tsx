import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { juliaMorganHtml } from "../data/juliaMorganHtml";
import { useTitle } from "@/hooks/useTitle";

export default function Julia() {
  useTitle("Julia Morgan | Bay Area Architect | Realtor 510");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 flex flex-col">
        <iframe 
          srcDoc={juliaMorganHtml} 
          className="w-full flex-1 border-none min-h-[calc(100vh-80px)] bg-white" 
          title="Julia Morgan — Architect of California"
        />
      </main>
      <Footer />
    </div>
  );
}