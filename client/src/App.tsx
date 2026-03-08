import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Answers from "@/pages/Answers";
import AnswerDetail from "@/pages/AnswerDetail";
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
      <Route path="/answers" component={Answers}/>
      <Route path="/answers/:id" component={AnswerDetail}/>
      <Route path="/reviews" component={Reviews}/>
      <Route path="/trends" component={Trends}/>
      <Route path="/waters" component={Waters}/>
      <Route path="/neighborhoods" component={Neighborhoods}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
