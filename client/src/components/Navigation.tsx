import { Link } from "wouter";
import logo from "@assets/PM_LOGO_Red_1772927689333.png";

export default function Navigation() {
  return (
    <nav className="fixed w-full z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <img src={logo} alt="Patrick MacCartee Logo" className="h-12 w-auto cursor-pointer object-contain" />
        </Link>
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
      </div>
    </nav>
  );
}
