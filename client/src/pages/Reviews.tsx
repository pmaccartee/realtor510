import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Patrick is beyond knowledgeable on the real estate industry and was so hopeful with the selling process of our home. He not only understands real estate but he is well versed in architecture and design and is able to guide buyers and sellers on what is best to look for in homes. He understood what we wanted and was able to execute our sale in a professional and efficient manner. Our home sold above the asking Price and escrow was seamless and closed in 14 days. Thank you so much, Patrick!",
    author: "Seller — Oakland"
  },
  {
    text: "Why isn't 10 stars a thing? Maybe buying a home is a smooth joyous process for many, but for me, it messed with my head. While a great change, it was a GREAT change, big in scope and implication -- and a lot administratively at a very, very busy time for me professionally. Patrick's patience, insight, and unbelievably invaluable experience made the process painless at points and, dare I say, even fun!",
    author: "Buyer — East Bay"
  },
  {
    text: "Patrick was an extremely knowledgeable and flexible agent. He definitely knew the local market, which was invaluable for us in the competitive Oakland, CA market. He went the extra mile to talk with the seller of the house and figure out what their selling goals were, which allowed us to make an offer within our budget that also made the seller happy. Would highly recommend!",
    author: "Buyer — Oakland"
  },
  {
    text: "Patrick is an excellent negotiator and tries to get the best dollar value for your home. The differentiating factor in him besides the other realtors that he brings a unique combination of sales and builder skills. He is a pro on giving curb appeals to your property which gives the best first impression. I sold 2 properties and bought 1 property within 2 months.",
    author: "Seller & Buyer — East Bay"
  },
  {
    text: "Patrick was hands-on without being pushy in helping me get the house ready to go on the market. He guided me with decision-making, and had the best resources for cleaning, clearing, landscaping support, staging & whatever else was needed.",
    author: "Seller — East Bay"
  },
  {
    text: "I couldn't be more pleased with my experience with Patrick. Patrick is great to work with. He's super responsive, fun to work with and has a great eye for value. He is a good, respectful negotiator and really cares about finding the right house.",
    author: "Buyer — East Bay"
  },
  {
    text: "Patrick was a tremendous help as we navigated the market for several years providing insights and guidance along the way. He's direct, honest, and easy to work with.",
    author: "Buyer — East Bay"
  },
  {
    text: "Patrick was great to work with. This was my first home purchase and I knew next to nothing. The entire process could have been overwhelming, but Patrick walked me through every step.",
    author: "First-Time Buyer — East Bay"
  },
  {
    text: "Patrick was great to work with. He knew his markets and was very strategic with getting the best buyer for our home.",
    author: "Seller — East Bay"
  },
  {
    text: "Patrick did an amazing job with my purchase! I'd recommend him to anyone!",
    author: "Buyer — East Bay"
  }
];

export default function Reviews() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <section className="bg-secondary py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">
                Client Experiences
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6 leading-tight">
                Reputation is Everything.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                Hear directly from buyers and sellers about their experience navigating the East Bay market.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
              {reviews.map((review, index) => (
                <div key={index} className="flex flex-col h-full bg-secondary p-10 border-t-4 border-primary">
                  <div className="flex items-center space-x-1 mb-6 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif text-xl leading-relaxed text-foreground italic mb-8 flex-grow">
                    "{review.text}"
                  </p>
                  <div className="font-medium text-sm tracking-widest uppercase text-muted-foreground border-t border-border pt-4">
                    {review.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
