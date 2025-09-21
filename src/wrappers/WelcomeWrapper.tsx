import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function WelcomeWrapper() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Redirect authenticated users based on registration completion
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Check if user has completed all required registration steps
      const hasBasicInfo = user.firstName && user.lastName && user.dateOfBirth && user.city;
      const hasPreferences = user.preferences?.whatFriendsSay && 
                            user.preferences?.drinking && 
                            user.preferences?.smoking && 
                            user.preferences?.married && 
                            user.preferences?.occupation;
      
      if (!hasBasicInfo || !hasPreferences) {
        // User hasn't completed registration, send them back to auth flow
        setLocation("/auth");
      } else {
        // Registration complete, go to dashboard
        setLocation("/dashboard");
      }
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