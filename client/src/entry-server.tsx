import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Blog from "@/pages/Blog";
import Reviews from "@/pages/Reviews";
import Waters from "@/pages/Waters";
import Neighborhoods from "@/pages/Neighborhoods";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buy" component={Buy} />
      <Route path="/sell" component={Sell} />
      <Route path="/blog" component={Blog} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/waters" component={Waters} />
      <Route path="/neighborhoods" component={Neighborhoods} />
      <Route component={NotFound} />
    </Switch>
  );
}

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <Router ssrPath={url}>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );

  return html;
}
