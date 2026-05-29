import { Link } from "wouter";
import NeighborhoodBar from "./NeighborhoodBar";

export default function Footer() {
  return (
    <>
    <NeighborhoodBar />
    <footer className="bg-foreground border-t border-white/10 text-white/50 py-16 text-center text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="font-sans text-2xl tracking-wider text-white mb-2">
            PATRICK M<span className="text-sm align-top lowercase">AC</span>CARTEE
          </div>
          <div className="text-xs tracking-widest uppercase">
            DRE# 02142693
          </div>
        </div>
        <div className="space-x-8 text-xs tracking-widest uppercase font-medium">
          <Link href="/buy" className="hover:text-primary transition-colors">Buy</Link>
          <Link href="/sell" className="hover:text-primary transition-colors">Sell</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/neighborhoods" className="hover:text-primary transition-colors">Neighborhoods</Link>
          <a href="/east-bay-school-guide" className="hover:text-primary transition-colors">Schools</a>
          <Link href="/waters" className="hover:text-primary transition-colors">Alice Waters</Link>
          <a href="/julia-morgan" className="hover:text-primary transition-colors">Julia Morgan</a>
          <a href="mailto:patrick@grubbco.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
    </>
  );
}
