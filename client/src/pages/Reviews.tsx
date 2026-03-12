import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";
import { useTitle } from "@/hooks/useTitle";
import { useDescription } from "@/hooks/useDescription";

const reviews = [
  {
    text: "Patrick is beyond knowledgeable on the real estate industry and was so hopeful with the selling process of our home. He not only understands real estate but he is well versed in architecture and design and is able to guide buyers and sellers on what is best to look for in homes. He understood what we wanted and was able to execute our sale in a professional and efficient manner. Our home sold above the asking Price and escrow was seamless and closed in 14 days. Thank you so much, Patrick!",
    name: "Carter P",
    location: "Rancho Santa Fe, CA"
  },
  {
    text: "Why isn't 10 stars a thing? Maybe buying a home is a smooth joyous process for many, but for me, it messed with my head. While a great change, it was a GREAT change, big in scope and implication -- and a lot administratively at a very, very busy time for me professionally. Patrick's patience, insight, and unbelievably invaluable experience made the process painless at points and, dare I say, even fun!",
    name: "Stacy T",
    location: "San Francisco, CA"
  },
  {
    text: "Patrick was an extremely knowledgeable and flexible agent. He definitely knew the local market, which was invaluable for us in the competitive Oakland, CA market. He went the extra mile to talk with the seller of the house and figure out what their selling goals were, which allowed us to make an offer within our budget that also made the seller happy. Would highly recommend!",
    name: "Susan Hepp",
    location: "Oakland, CA"
  },
  {
    text: "Patrick is an excellent negotiator and tries to get the best dollar value for your home. The differentiating factor in him besides the other realtors that he brings a unique combination of sales and builder skills. He is a pro on giving curb appeals to your property which gives the best first impression. I sold 2 properties and bought 1 property within 2 months.",
    name: "Jai B.",
    location: "Oakland, CA"
  },
  {
    text: "Patrick was hands-on without being pushy in helping me get the house ready to go on the market. He guided me with decision-making, and had the best resources for cleaning, clearing, landscaping support, staging & whatever else was needed.",
    name: "Zillow User",
    location: "Oakland, CA"
  },
  {
    text: "I couldn't be more pleased with my experience with Patrick. Patrick is great to work with. He's super responsive, fun to work with and has a great eye for value. He is a good, respectful negotiator and really cares about finding the right house.",
    name: "Zillow User",
    location: "Sacramento, CA"
  },
  {
    text: "Patrick was a tremendous help as we navigated the market for several years providing insights and guidance along the way. He's direct, honest, and easy to work with.",
    name: "Jeff P Manassero",
    location: "Oakland, CA"
  },
  {
    text: "Patrick was great to work with. This was my first home purchase and I knew next to nothing. The entire process could have been overwhelming, but Patrick walked me through every step.",
    name: "Ahmed Zaeem",
    location: "San Francisco, CA"
  },
  {
    text: "Patrick was great to work with. He knew his markets and was very strategic with getting the best buyer for our home.",
    name: "Redfin User",
    location: "Rancho Santa Fe, CA"
  },
  {
    text: "Patrick did an amazing job with my purchase! I'd recommend him to anyone!",
    name: "Redfin User",
    location: "Oakland, CA"
  }
];

export default function Reviews() {
  useTitle("Client Reviews | Patrick MacCartee Realtor");
  useDescription("See what clients say about working with Patrick MacCartee, East Bay realtor with The Grubb Company.");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-primary text-white py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-white/70 uppercase">CLIENT WORDS</h2>
            <blockquote className="text-3xl md:text-5xl font-serif leading-tight">
              "Patrick definitely knew the local market, which was invaluable for us in the competitive Oakland market."
            </blockquote>
            <div className="mt-12 flex items-center justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-white text-white" />
              ))}
            </div>
            <div className="mt-4 text-white/70 font-medium tracking-wide uppercase">
              — Susan Hepp
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow break-inside-avoid border border-border">
                  <div className="flex mb-4 text-black">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed text-sm">
                    "{review.text}"
                  </p>
                  <div className="font-bold text-sm text-foreground">{review.name}</div>
                  <div className="text-xs text-muted-foreground uppercase mt-1">{review.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Track Record</h2>
            </div>
            
            {/* RealScout Integration */}
            <div className="w-full bg-white shadow-sm border border-black/5 p-4 min-h-[400px]">
              <realscout-your-listings 
                agent-encoded-id="QWdlbnQtMjUyMzU1" 
                sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
                listing-status=",Sold" 
                property-types="SFR,MF"
                include-co-listings
                include-seller-listings
              ></realscout-your-listings>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
