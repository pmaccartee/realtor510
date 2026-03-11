const fs = require('fs');

const files = [
  'client/public/crocker-highlands-guide.html',
  'client/public/piedmont-home-values.html',
  'client/public/sequoyah-hills-market-report.html',
  'client/public/trestle-glen-guide.html',
  'client/public/montclair-guide.html',
  'client/public/oakmore-glenview-guide.html',
  'client/public/rockridge-guide.html',
  'client/public/temescal-guide.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Make absolutely sure there's no layout jank, forcing height, display, and positioning precisely as it is rendered by Tailwind in React
  const cssReplacement = `/* ── Site Header (Exactly matches React) ── */
  .react-header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 50;
    background-color: #ffffff;
    border-bottom: 1px solid hsl(0, 0%, 90%);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: block;
    height: 80px; /* Force height */
  }
  
  .react-header-inner {
    max-width: 1280px; /* max-w-7xl */
    margin: 0 auto; /* mx-auto */
    padding: 0 24px; /* px-6 */
    height: 80px; /* h-20 */
    display: flex; /* flex */
    align-items: center; /* items-center */
    justify-content: space-between; /* justify-between */
    box-sizing: border-box;
  }
  
  .react-header-logo img {
    height: 48px; /* h-12 */
    width: auto; /* w-auto */
    cursor: pointer; /* cursor-pointer */
    object-fit: contain; /* object-contain */
    display: block;
  }
  
  .react-header-links {
    display: none; /* hidden by default */
  }
  
  @media (min-width: 768px) {
    .react-header-links {
      display: flex; /* md:flex */
      align-items: center; /* items-center */
      gap: 32px; /* space-x-8 */
      margin: 0;
      padding: 0;
    }
  }
  
  .react-header-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px; /* text-sm */
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.1em; /* tracking-widest */
    text-transform: uppercase; /* uppercase */
    color: hsl(0, 0%, 15%); /* text-foreground */
    text-decoration: none;
    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1); /* transition-colors */
  }
  
  .react-header-link:hover {
    color: hsl(355, 75%, 35%); /* hover:text-primary */
  }
  
  .react-header-btn {
    background-color: hsl(355, 75%, 35%); /* bg-primary */
    color: hsl(0, 0%, 100%) !important; /* text-primary-foreground */
    padding: 8px 24px; /* px-6 py-2 */
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px; /* text-sm */
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.1em; /* tracking-widest */
    text-transform: uppercase; /* uppercase */
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1); /* transition-colors */
    display: inline-block; /* inline-block */
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  }
  
  .react-header-btn:hover {
    background-color: hsla(355, 75%, 35%, 0.9); /* hover:bg-primary/90 */
  }

  .page-hero, .hero {
    padding-top: 152px !important; /* give enough space below 80px fixed header */
  }
  /* ── Page Hero ── */`;
  
  content = content.replace(/\/\* ── Site Header[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  fs.writeFileSync(file, content);
});
