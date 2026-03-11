const fs = require('fs');

const file = 'client/src/components/Navigation.tsx';
let content = `import { Link } from "wouter";
import { useState } from "react";
import logo from "@assets/PM_LOGO_Red_1772927689333.png";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <img src={logo} alt="Patrick MacCartee Logo" className="h-12 w-auto cursor-pointer object-contain" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">
          <Link href="/buy" className="hover:text-primary transition-colors">Buy</Link>
          <Link href="/sell" className="hover:text-primary transition-colors">Sell</Link>
          <Link href="/answers" className="hover:text-primary transition-colors">Answers</Link>
          <Link href="/reviews" className="hover:text-primary transition-colors">Reviews</Link>
          <Link href="/neighborhoods" className="hover:text-primary transition-colors">Neighborhoods</Link>
          <a href="mailto:patrick@realtor510.com" className="bg-primary text-primary-foreground px-6 py-2 hover:bg-primary/90 transition-colors shadow-sm inline-block">
            Contact
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-white border-t border-border overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6 text-lg tracking-widest uppercase font-medium">
            <Link href="/buy" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Buy</Link>
            <Link href="/sell" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sell</Link>
            <Link href="/answers" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Answers</Link>
            <Link href="/reviews" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/neighborhoods" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Neighborhoods</Link>
            <a 
              href="mailto:patrick@realtor510.com" 
              className="bg-primary text-primary-foreground px-6 py-3 text-center mt-4 shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
`;

fs.writeFileSync(file, content);
console.log('Fixed React mobile nav');
