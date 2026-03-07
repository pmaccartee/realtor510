import heroImg from "../assets/images/hero.png";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Oakland Skyline" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-12 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 leading-none drop-shadow-lg">
          SMART STRATEGY.<br />
          <span className="italic text-primary drop-shadow-md">CLEAN EXECUTION.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Your partner in East Bay Real Estate. Serving Oakland, Piedmont, Berkeley, and Alameda with a rigorous, analytical approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-primary transition-all duration-300 shadow-lg">
            Schedule Strategy Call
          </button>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-primary transition-all duration-300 shadow-lg">
            View Active Listings
          </button>
        </div>
      </div>
    </section>
  );
}
