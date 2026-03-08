import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Waters() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 flex flex-col">
        <iframe 
          src="/alice-waters.html" 
          className="w-full flex-1 border-none min-h-[calc(100vh-80px)]" 
          title="The House That Alice Built"
        />
      </main>
      <Footer />
    </div>
  );
}
