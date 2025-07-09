
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Graveyard from "./pages/Graveyard";
import BurySubmission from "./pages/BurySubmission";
import GraveDetails from "./pages/GraveDetails";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/graveyard" element={<Graveyard />} />
          <Route path="/bury" element={<BurySubmission />} />
          <Route path="/grave/:id" element={<GraveDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </TooltipProvider>
  );
}

export default App;
