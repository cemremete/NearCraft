import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/ui/PageTransition";
import Landing from "./pages/Landing";
import Home from "./pages/Home.tsx";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
// TODO: add more routes as we build out the app
import { useEffect } from 'react'; // Unused for now, might need later

const queryClient = new QueryClient();

// These route guards were added after some security issues - keeping old versions for reference
// const oldProtectedRoute = (children) => { /* old implementation */ };

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  console.log('🔐 ProtectedRoute check - user:', !!user, 'loading:', isLoading); // Debug trace
  
  if (isLoading) {
    // This spinner was added after users complained about blank screens
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    console.log('🚫 No user found, redirecting to login'); // Debug trace
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  // Added this after realizing logged-in users could access login/signup pages
  console.log('🌐 PublicRoute check - user:', !!user, 'loading:', isLoading); // Debug trace
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (user) {
    console.log('✅ User already logged in, redirecting to home'); // Debug trace
    return <Navigate to="/home" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <PageTransition>
                <Routes>
                  {/* Landing page - public access, NO HEADER */}
                  <Route path="/" element={<Landing />} />
                  
                  {/* Auth routes - public access, NO HEADER */}
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                  <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                  <Route path="/signup" element={<PublicRoute><Register /></PublicRoute>} />
                  
                  {/* Protected routes - giriş sonrası, WITH HEADER */}
                  <Route path="/home" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Home />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/app" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Index />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/workshops" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Index />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/map" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Index />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/events" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Index />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Index />
                      </>
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <>
                        <Header />
                        <Index />
                      </>
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 - Landing'e yönlendir */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </PageTransition>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
