import heroImg from "../assets/images/oakland-hero-gen.png";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end pt-20">
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="Oakland Skyline" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pb-24 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-foreground font-serif mb-6 leading-[1.1] drop-shadow-sm">
          Luxury Real Estate,<br />
          <span className="italic text-primary">Locally Mastered.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Your partner in East Bay Real Estate. Serving Oakland, Piedmont, Berkeley, and Alameda with a rigorous, analytical approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-primary text-primary-foreground px-10 py-5 text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 shadow-md">
            Schedule Strategy Call
          </button>
          <button className="bg-secondary text-foreground border-2 border-border px-10 py-5 text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300 shadow-sm">
            View Active Listings
          </button>
        </div>
      </div>
    </section>
  );
}
