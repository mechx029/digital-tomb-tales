
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import BurySubmission from "./pages/BurySubmission"; 
import GraveDetails from "./pages/GraveDetails";
import Graveyard from "./pages/Graveyard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen cemetery-bg">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bury" element={<BurySubmission />} />
              <Route path="/grave/:id" element={<GraveDetails />} />
              <Route path="/graveyard" element={<Graveyard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
