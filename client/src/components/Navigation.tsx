import { Link } from "wouter";

export default function Navigation() {
  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wider text-primary">
          PATRICK M<span className="text-sm align-top lowercase">AC</span>CARTEE
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">
          <a href="#" className="hover:text-primary transition-colors">Strategy</a>
          <a href="#" className="hover:text-primary transition-colors">Listings</a>
          <a href="#" className="hover:text-primary transition-colors">About</a>
          <button className="bg-primary text-primary-foreground px-6 py-2 hover:bg-primary/90 transition-colors shadow-sm">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
