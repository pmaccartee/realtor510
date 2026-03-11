const fs = require('fs');

const file = 'client/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// If there isn't already a scroll to top effect, let's add one
if (!content.includes('ScrollToTop')) {
  // Add an import for useEffect and useLocation if missing
  if (!content.includes('import { useEffect } from "react"')) {
    content = content.replace('import { Switch, Route } from "wouter";', 'import { Switch, Route, useLocation } from "wouter";\nimport { useEffect } from "react";');
  }

  // Define the ScrollToTop component
  const scrollToTopComponent = `
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

`;

  // Insert before function App()
  content = content.replace('function App() {', scrollToTopComponent + 'function App() {');
  
  // Insert inside Router
  content = content.replace('<Router>', '<Router>\n      <ScrollToTop />');
  
  fs.writeFileSync(file, content);
  console.log('Added ScrollToTop to App.tsx');
} else {
  console.log('ScrollToTop already exists');
}
