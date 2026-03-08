import heroImg from "../assets/images/oakland-hero-gen.png";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Oakland Skyline" className="w-full h-full object-cover object-center" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24 animate-in fade-in zoom-in duration-1000 mt-12 bg-black/30 backdrop-blur-[2px] rounded-lg p-12 shadow-2xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 leading-[1.1] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Luxury Real Estate,<br />
          <span className="italic text-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Locally Mastered.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Your partner in East Bay Real Estate. Serving Oakland, Piedmont, Berkeley, and Alameda with a rigorous, analytical approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-primary text-primary-foreground px-10 py-5 text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 shadow-xl border border-primary/20">
            Schedule Strategy Call
          </button>
          <button className="bg-black/40 backdrop-blur-md text-white border-2 border-white/50 px-10 py-5 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-xl">
            View Active Listings
          </button>
        </div>
      </div>
    </section>
  );
}
