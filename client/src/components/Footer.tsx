import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground border-t border-white/10 text-white/50 py-16 text-center text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="font-serif text-2xl tracking-wider text-white mb-2">
            PATRICK M<span className="text-sm align-top lowercase">AC</span>CARTEE
          </div>
          <div className="text-xs tracking-widest uppercase">
            DRE# 02142693
          </div>
        </div>
        <div className="space-x-8 text-xs tracking-widest uppercase font-medium">
          <Link href="/julia" className="hover:text-primary transition-colors">Julia Morgan</Link>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="mailto:patrick@realtor510.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
