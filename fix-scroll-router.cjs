const fs = require('fs');

const file = 'client/src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// The ScrollToTop needs to be INSIDE the Router component but outside the Switch
// So let's create a wrapper that handles this cleanly
const appComponent = `function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Router />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}`;

content = content.replace(/function App\(\) \{[\s\S]*?export default App;/g, appComponent + '\n\nexport default App;');

fs.writeFileSync(file, content);
console.log('Fixed ScrollToTop location inside App.tsx');
