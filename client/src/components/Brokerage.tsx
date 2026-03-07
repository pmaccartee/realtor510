export default function Brokerage() {
  return (
    <section className="py-32 bg-foreground text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <span className="text-sm tracking-widest uppercase text-white/50 mb-6 block font-medium">Brokerage Backing</span>
        <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">
          Powered by <br className="md:hidden" /><span className="text-primary italic">The Grubb Company.</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-6 text-white/80 leading-relaxed font-light text-lg mb-12">
          <p>
            We are backed by the East Bay's premier luxury brokerage. Since 1967, The Grubb Company has set the standard for high-touch service and deep local roots.
          </p>
          <p>
            This partnership combines our modern, data-driven agility with the stability and network of a legendary local institution.
          </p>
        </div>
        <a href="https://www.grubbco.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-foreground px-10 py-4 text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
          Visit Grubbco.com
        </a>
      </div>
    </section>
  );
}
