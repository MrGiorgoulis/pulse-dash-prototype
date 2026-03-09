import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerOnboarding from "./pages/CustomerOnboarding";
import CoverageReadiness from "./pages/CoverageReadiness";
import EventsPage from "./pages/EventsPage";
import ControlRoom from "./pages/ControlRoom";
import Bidding from "./pages/Bidding";
import Reconciliation from "./pages/Reconciliation";
import Settlement from "./pages/Settlement";
import Assets from "./pages/Assets";
import Statements from "./pages/Statements";
import Payouts from "./pages/Payouts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<CustomerOnboarding />} />
            <Route path="/coverage" element={<CoverageReadiness />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/statements" element={<Statements />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/control-room" element={<ControlRoom />} />
            <Route path="/bidding" element={<Bidding />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/settlement" element={<Settlement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
