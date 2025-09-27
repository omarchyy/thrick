import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import BrowsePage from "@/pages/BrowsePage";
import CreatePage from "@/pages/CreatePage";
import SocialPage from "@/pages/SocialPage";
import ProgressPage from "@/pages/ProgressPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/not-found";
import AIPage from "./pages/AiPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/browse" component={BrowsePage} />
      <Route path="/create" component={CreatePage} />
      <Route path="/social" component={SocialPage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/ai" component={AIPage} /> {/* Add this */}

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="w-[500px] mx-auto">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
    </div>
  );
}

export default App;
