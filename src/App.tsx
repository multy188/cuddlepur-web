import { useState } from "react";
import { Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { Routes } from "./routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router>
            <Layout>
              <Routes
                isAuthenticated={isAuthenticated}
                onAuthComplete={handleAuthComplete}
              />
            </Layout>
          </Router>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
