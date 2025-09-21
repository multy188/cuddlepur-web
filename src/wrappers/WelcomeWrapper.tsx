import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function WelcomeWrapper() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Redirect authenticated users based on their status
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Check if user has completed basic info
      if (!user.firstName || !user.lastName || !user.dateOfBirth) {
        setLocation("/setup/basic-info");
        return;
      }
      
      // Go directly to dashboard after basic info completion
      setLocation("/dashboard");
    }
  }, [isAuthenticated, isLoading, user, setLocation]);
  
  // Don't render welcome screen if authenticated (will redirect)
  if (isLoading || isAuthenticated) {
    return null;
  }
  
  return (
    <WelcomeScreen
      onGetStarted={() => setLocation("/auth")}
      onSignIn={() => setLocation("/auth")}
      onNavigate={(page) => {
        const routes: Record<string, string> = {
          'how-it-works': '/how-it-works',
          'faq': '/faq',
          'terms': '/terms',
          'privacy': '/privacy'
        };
        setLocation(routes[page] || '/');
      }}
      isAuthenticated={false}
      onGoToApp={() => setLocation("/dashboard")}
    />
  );
}