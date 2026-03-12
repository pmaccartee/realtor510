import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Blog from "@/pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Reviews from "@/pages/Reviews";
import Trends from "@/pages/Trends";
import Waters from "@/pages/Waters";

import Neighborhoods from "@/pages/Neighborhoods";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/buy" component={Buy}/>
      <Route path="/sell" component={Sell}/>
      <Route path="/blog" component={Blog}/>
      <Route path="/blog/:id" component={BlogDetail}/>
      <Route path="/reviews" component={Reviews}/>
      <Route path="/trends" component={Trends}/>
      <Route path="/waters" component={Waters}/>
      <Route path="/neighborhoods" component={Neighborhoods}/>
      <Route path="/trends/waters" component={Waters}/>
      <Route component={NotFound} />
    </Switch>
  );
}


function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }, [location]);

  return null;
}

function AppContent() {
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
}

export default App;
