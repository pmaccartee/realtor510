import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { useTitle } from "@/hooks/useTitle";
import Agent from "@/components/Agent";
import Featured from "@/components/Featured";
import CurrentListings from "@/components/CurrentListings";
import Brokerage from "@/components/Brokerage";
import Footer from "@/components/Footer";

export default function Home() {
  useTitle("Patrick MacCartee | Oakland Real Estate Agent | East Bay Homes");
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Agent />
        <Featured />
        <CurrentListings />
        <Brokerage />
      </main>
      <Footer />
    </div>
  );
}
