const fs = require('fs');

const file = 'client/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// The React hook for scroll restoration needs a slightly different implementation for wouter
// because just calling window.scrollTo inside a component that isn't connected to the routing lifecycle
// might trigger before the new DOM is painted.

const newScrollToTop = `function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Need a tiny timeout to ensure it happens after React renders the new route
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }, [location]);

  return null;
}`;

content = content.replace(/function ScrollToTop\(\) \{[\s\S]*?return null;\n\}/, newScrollToTop);

fs.writeFileSync(file, content);
console.log('Updated ScrollToTop logic in React');
