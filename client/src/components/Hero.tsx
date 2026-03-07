import { useState } from "react";
import heroImg from "../assets/images/hero.png";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <section className="relative h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Oakland Skyline" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      <div className="relative z-10 w-full px-6 max-w-5xl mx-auto mt-12 animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 leading-none drop-shadow-lg text-center">
          SMART STRATEGY.<br />
          <span className="italic text-primary drop-shadow-md">CLEAN EXECUTION.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl text-center mx-auto font-light leading-relaxed drop-shadow-sm">
          Your partner in East Bay Real Estate. Serving Oakland, Piedmont, Berkeley, and Alameda with a rigorous, analytical approach.
        </p>
        
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-1 border border-white/20 shadow-2xl">
          <div className="flex border-b border-white/20">
            <button 
              onClick={() => setActiveTab('buy')}
              className={`flex-1 py-4 text-sm tracking-widest uppercase font-medium transition-colors ${activeTab === 'buy' ? 'bg-primary text-white' : 'text-white hover:bg-white/10'}`}
            >
              Buy
            </button>
            <button 
              onClick={() => setActiveTab('sell')}
              className={`flex-1 py-4 text-sm tracking-widest uppercase font-medium transition-colors ${activeTab === 'sell' ? 'bg-primary text-white' : 'text-white hover:bg-white/10'}`}
            >
              Sell
            </button>
            <button 
              onClick={() => setActiveTab('answers')}
              className={`flex-1 py-4 text-sm tracking-widest uppercase font-medium transition-colors ${activeTab === 'answers' ? 'bg-primary text-white' : 'text-white hover:bg-white/10'}`}
            >
              Answers
            </button>
          </div>
          
          <div className="bg-white p-6 sm:p-8 shadow-inner">
            {activeTab === 'buy' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-serif text-foreground mb-4">Find Your Dream Home</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="Enter city, neighborhood, or zip code" 
                    className="flex-1 border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="bg-primary text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'sell' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-serif text-foreground mb-4">Discover Your Home's Value</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="Enter your property address" 
                    className="flex-1 border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="bg-foreground text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors">
                    Get Estimate
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'answers' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-serif text-foreground mb-4">Expert Real Estate Advice</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="Ask a question about the East Bay market..." 
                    className="flex-1 border border-border p-4 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="bg-primary text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors">
                    Ask Patrick
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
