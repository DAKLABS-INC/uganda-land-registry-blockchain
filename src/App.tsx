import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RegisterLand from "./pages/RegisterLand";
import SearchRecords from "./pages/SearchRecords";
import ProcessTransfer from "./pages/ProcessTransfer";
import LandSubdivision from "./pages/LandSubdivision";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard userRole="administrator" onLogout={() => window.location.href = "/"} />} />
          <Route path="/register-land" element={<RegisterLand />} />
          <Route path="/search-records" element={<SearchRecords />} />
          <Route path="/process-transfer" element={<ProcessTransfer />} />
          <Route path="/land-subdivision" element={<LandSubdivision />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
