import { useState } from "react";
import { Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import { Routes } from "./routes";
import NotificationToast from "@/components/NotificationToast";
import { useNotifications } from "@/hooks";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Use custom hook for notifications
  const { 
    notifications, 
    dismissNotification, 
    markNotificationAsRead 
  } = useNotifications();

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
              
              {/* Notification Toast System */}
              <NotificationToast 
                notifications={notifications}
                onDismiss={dismissNotification}
                onMarkAsRead={markNotificationAsRead}
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