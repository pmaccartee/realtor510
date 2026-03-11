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

  // Let's replace the ENTIRE header CSS and HTML to literally just embed a raw copy of the Tailwind-generated markup.
  // This avoids any custom CSS class mapping issues entirely.
  
  const cssReplacement = `/* ── Tailwind Header Utilities for HTML Pages ── */
  .tw-fixed { position: fixed; }
  .tw-w-full { width: 100%; }
  .tw-z-50 { z-index: 50; }
  .tw-bg-white { background-color: #ffffff; }
  .tw-border-b { border-bottom-width: 1px; }
  .tw-border-border { border-color: hsl(0, 0%, 90%); }
  .tw-shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .tw-max-w-7xl { max-width: 80rem; }
  .tw-mx-auto { margin-left: auto; margin-right: auto; }
  .tw-px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .tw-h-20 { height: 5rem; }
  .tw-flex { display: flex; }
  .tw-items-center { align-items: center; }
  .tw-justify-between { justify-content: space-between; }
  .tw-h-12 { height: 3rem; }
  .tw-w-auto { width: auto; }
  .tw-cursor-pointer { cursor: pointer; }
  .tw-object-contain { object-fit: contain; }
  .tw-hidden { display: none; }
  .tw-space-x-8 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(2rem * var(--tw-space-x-reverse)); margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse))); }
  .tw-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .tw-tracking-widest { letter-spacing: 0.1em; }
  .tw-uppercase { text-transform: uppercase; }
  .tw-transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  .tw-bg-primary { background-color: hsl(355, 75%, 35%); }
  .tw-text-primary-foreground { color: hsl(0, 0%, 100%); }
  .tw-py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .tw-inline-block { display: inline-block; }
  
  a.tw-hover-text-primary:hover { color: hsl(355, 75%, 35%); }
  a.tw-hover-bg-primary-90:hover { background-color: hsla(355, 75%, 35%, 0.9); }
  
  @media (min-width: 768px) {
    .md\\:tw-flex { display: flex; }
  }

  .page-hero, .hero {
    padding-top: 5rem !important; /* Exactly h-20 */
  }

  /* ── Page Hero ── */`;
  
  // Replace anything between /* ── Site Header and /* ── Page Hero ── */
  content = content.replace(/\/\* ── Site Header[\s\S]*?\/\* ── Page Hero ── \*\//, cssReplacement);
  
  // Replace the HTML nav
  const htmlNavReplacement = `<!-- EXACT REACT HEADER MATCH -->
<nav class="tw-fixed tw-w-full tw-z-50 tw-bg-white tw-border-b tw-border-border tw-shadow-sm" style="font-family: 'Montserrat', sans-serif;">
  <div class="tw-max-w-7xl tw-mx-auto tw-px-6 tw-h-20 tw-flex tw-items-center tw-justify-between">
    <a href="/">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" class="tw-h-12 tw-w-auto tw-cursor-pointer tw-object-contain" style="display: block;">
    </a>
    <div class="tw-hidden md:tw-flex tw-items-center tw-space-x-8 tw-text-sm tw-tracking-widest tw-uppercase">
      <a href="/buy" class="tw-transition-colors tw-hover-text-primary" style="color: hsl(0, 0%, 15%); text-decoration: none;">Buy</a>
      <a href="/sell" class="tw-transition-colors tw-hover-text-primary" style="color: hsl(0, 0%, 15%); text-decoration: none;">Sell</a>
      <a href="/answers" class="tw-transition-colors tw-hover-text-primary" style="color: hsl(0, 0%, 15%); text-decoration: none;">Answers</a>
      <a href="/reviews" class="tw-transition-colors tw-hover-text-primary" style="color: hsl(0, 0%, 15%); text-decoration: none;">Reviews</a>
      <a href="/neighborhoods" class="tw-transition-colors tw-hover-text-primary" style="color: hsl(0, 0%, 15%); text-decoration: none;">Neighborhoods</a>
      <a href="mailto:patrick@realtor510.com" class="tw-bg-primary tw-text-primary-foreground tw-px-6 tw-py-2 tw-hover-bg-primary-90 tw-transition-colors tw-shadow-sm tw-inline-block" style="text-decoration: none;">
        Contact
      </a>
    </div>
  </div>
</nav>`;

  content = content.replace(/<nav class="site-header">[\s\S]*?<\/nav>/, htmlNavReplacement);
  // Also clean up any lingering old headers
  content = content.replace(/<!-- EXACT REACT HEADER MATCH -->[\s\S]*?<\/nav>/, htmlNavReplacement);
  
  fs.writeFileSync(file, content);
  console.log(`Fully injected React markup clone in ${file}`);
});
