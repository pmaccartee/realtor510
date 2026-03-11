const fs = require('fs');
const glob = require('glob');

// 1. Update React component
const reactNavPath = 'client/src/components/Navigation.tsx';
let reactNavContent = fs.readFileSync(reactNavPath, 'utf8');

// The new order: Buy - Sell - Reviews - Neighborhoods - Answers

// Update Desktop links
const desktopPattern = /<div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">([\s\S]*?)<a href="mailto:patrick@realtor510.com"/;
const desktopReplacement = `<div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">
          <Link href="/buy" className="hover:text-primary transition-colors">Buy</Link>
          <Link href="/sell" className="hover:text-primary transition-colors">Sell</Link>
          <Link href="/reviews" className="hover:text-primary transition-colors">Reviews</Link>
          <Link href="/neighborhoods" className="hover:text-primary transition-colors">Neighborhoods</Link>
          <Link href="/answers" className="hover:text-primary transition-colors">Answers</Link>
          <a href="mailto:patrick@realtor510.com"`;
          
reactNavContent = reactNavContent.replace(desktopPattern, desktopReplacement);

// Update Mobile links
const mobilePattern = /<div className="flex flex-col p-6 space-y-6 text-lg tracking-widest uppercase font-medium">([\s\S]*?)<a/;
const mobileReplacement = `<div className="flex flex-col p-6 space-y-6 text-lg tracking-widest uppercase font-medium">
            <Link href="/buy" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Buy</Link>
            <Link href="/sell" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sell</Link>
            <Link href="/reviews" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Reviews</Link>
            <Link href="/neighborhoods" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Neighborhoods</Link>
            <Link href="/answers" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Answers</Link>
            <a`;

reactNavContent = reactNavContent.replace(mobilePattern, mobileReplacement);
fs.writeFileSync(reactNavPath, reactNavContent);
console.log('Updated React Navigation');

// 2. Update all HTML files
const htmlFiles = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html',
  'client/public/montclair-guide.html',
  'client/public/oakmore-glenview-guide.html',
  'client/public/rockridge-guide.html',
  'client/public/temescal-guide.html',
  'client/public/berkeley-hills-guide.html'
];

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let htmlContent = fs.readFileSync(file, 'utf8');
  
  // Desktop HTML Nav
  const desktopHtmlPattern = /<div class="react-header-links desktop-only">([\s\S]*?)<a href="javascript:void\(0\)"/;
  const desktopHtmlReplacement = `<div class="react-header-links desktop-only">
      <a href="/buy" class="react-header-link">Buy</a>
      <a href="/sell" class="react-header-link">Sell</a>
      <a href="/reviews" class="react-header-link">Reviews</a>
      <a href="/neighborhoods" class="react-header-link">Neighborhoods</a>
      <a href="/answers" class="react-header-link">Answers</a>
      <a href="javascript:void(0)"`;
      
  htmlContent = htmlContent.replace(desktopHtmlPattern, desktopHtmlReplacement);
  
  // Mobile HTML Nav
  const mobileHtmlPattern = /<div class="mobile-menu-content">([\s\S]*?)<a href="javascript:void\(0\)"/;
  const mobileHtmlReplacement = `<div class="mobile-menu-content">
      <a href="/buy" class="mobile-nav-link">Buy</a>
      <a href="/sell" class="mobile-nav-link">Sell</a>
      <a href="/reviews" class="mobile-nav-link">Reviews</a>
      <a href="/neighborhoods" class="mobile-nav-link">Neighborhoods</a>
      <a href="/answers" class="mobile-nav-link">Answers</a>
      <a href="javascript:void(0)"`;
      
  htmlContent = htmlContent.replace(mobileHtmlPattern, mobileHtmlReplacement);
  
  fs.writeFileSync(file, htmlContent);
  console.log(`Updated ${file}`);
});
