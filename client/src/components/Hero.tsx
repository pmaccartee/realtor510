import heroImg from "../assets/images/oakland-hero-gen.png";

export default function Hero() {
  return (
    <section className="flex flex-col pt-20">
      <div className="w-full h-[60vh] md:h-[70vh]">
        <img src={heroImg} alt="Oakland Skyline" className="w-full h-full object-cover object-center" />
      </div>
      <div className="w-full bg-background py-16 md:py-24">
        <div className="text-center px-6 max-w-5xl mx-auto animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-foreground font-serif mb-6 leading-[1.1] drop-shadow-sm">
            Luxury Real Estate,<br />
            <span className="italic text-primary">Locally Mastered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Your partner in East Bay Real Estate. Serving Oakland, Piedmont, Berkeley, and Alameda with a rigorous, analytical approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5108594895" className="bg-primary text-primary-foreground px-8 py-5 text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300 shadow-md text-center">
              Call (510) 859-4895
            </a>
            <a href="mailto:patrick@realtor510.com" className="bg-secondary text-foreground border-2 border-border px-8 py-5 text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300 shadow-sm text-center">
              Email patrick@realtor510.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
