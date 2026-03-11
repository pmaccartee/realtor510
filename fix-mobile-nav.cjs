const fs = require('fs');

const files = [
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

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // We need to implement a mobile hamburger menu for the HTML pages
  // First, let's inject the necessary CSS and JS
  
  // Replace the header block to include mobile toggle button and mobile menu structure
  const headerReplacement = `<header class="react-header-wrapper">
  <div class="react-header-inner">
    <a href="/" class="react-header-logo-link">
      <img src="/PM_LOGO_Red_1772927689333.png" alt="Patrick MacCartee Logo" class="react-header-logo-img">
    </a>
    
    <!-- Mobile Menu Button -->
    <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
    </button>

    <!-- Desktop Links -->
    <div class="react-header-links desktop-only">
      <a href="/buy" class="react-header-link">Buy</a>
      <a href="/sell" class="react-header-link">Sell</a>
      <a href="/answers" class="react-header-link">Answers</a>
      <a href="/reviews" class="react-header-link">Reviews</a>
      <a href="/neighborhoods" class="react-header-link">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')" class="react-header-btn">Contact</a>
    </div>
  </div>
  
  <!-- Mobile Navigation Menu -->
  <div id="mobile-menu" class="mobile-menu-overlay hidden">
    <div class="mobile-menu-content">
      <a href="/buy" class="mobile-nav-link">Buy</a>
      <a href="/sell" class="mobile-nav-link">Sell</a>
      <a href="/answers" class="mobile-nav-link">Answers</a>
      <a href="/reviews" class="mobile-nav-link">Reviews</a>
      <a href="/neighborhoods" class="mobile-nav-link">Neighborhoods</a>
      <a href="javascript:void(0)" onclick="window.location.href='tel:' + [5, 1, 0].join('') + [8, 5, 9].join('') + [4, 8, 9, 5].join('')" class="mobile-nav-btn">Contact</a>
    </div>
  </div>
</header>`;

  content = content.replace(/<header class="react-header-wrapper">[\s\S]*?<\/header>/, headerReplacement);
  
  // Add CSS for mobile menu
  const mobileMenuCSS = `
  /* ── Mobile Menu Styles ── */
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: hsl(0, 0%, 15%);
    padding: 8px;
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: white;
    z-index: 40;
    overflow-y: auto;
    border-top: 1px solid hsl(0, 0%, 90%);
  }
  
  .mobile-menu-overlay.hidden {
    display: none;
  }
  
  .mobile-menu-content {
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
  }
  
  .mobile-nav-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: hsl(0, 0%, 15%);
    text-decoration: none;
    display: block;
  }
  
  .mobile-nav-btn {
    background-color: hsl(355, 75%, 35%);
    color: white !important;
    padding: 12px 24px;
    text-align: center;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: block;
    margin-top: 8px;
  }
  
  @media (max-width: 767px) {
    .desktop-only {
      display: none !important;
    }
    .mobile-menu-btn {
      display: block;
    }
    
    /* Ensure content padding works on mobile */
    .page-hero {
      padding: 48px 24px !important;
    }
    .page-hero h1 {
      font-size: 2rem !important;
    }
    .page-wrap {
      padding: 48px 20px !important;
    }
    
    /* Fix grid layouts on mobile */
    .stat-row {
      grid-template-columns: 1fr 1fr !important;
    }
    .arch-grid, .metrics, .segment-grid {
      grid-template-columns: 1fr !important;
    }
  }
  /* ── End Mobile Menu Styles ── */
  `;

  // Insert CSS right before </style>
  if (!content.includes('.mobile-menu-btn')) {
    content = content.replace('</style>', mobileMenuCSS + '\n</style>');
  }
  
  // Add Javascript for toggling right before </body>
  const mobileMenuJS = `
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Change icon to X when open
        if (mobileMenu.classList.contains('hidden')) {
          mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
          document.body.style.overflow = '';
        } else {
          mobileMenuBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
          document.body.style.overflow = 'hidden'; // Prevent scrolling behind menu
        }
      });
    }
  });
</script>
</body>`;

  if (!content.includes('id="mobile-menu-btn"')) {
    content = content.replace('</body>', mobileMenuJS);
  }
  
  fs.writeFileSync(file, content);
  console.log(`Added mobile nav to ${file}`);
});
