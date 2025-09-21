import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import AuthFlow from "@/components/AuthFlow";

export default function AuthWrapper() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  // Check if user has completed all required registration steps
  const isRegistrationComplete = (user: any) => {
    if (!user) return false;
    
    // Check basic info
    if (!user.firstName || !user.lastName || !user.dateOfBirth || !user.city) {
      return false;
    }
    
    // Check preferences
    if (!user.preferences?.whatFriendsSay || !user.preferences?.drinking || 
        !user.preferences?.smoking || !user.preferences?.married || !user.preferences?.occupation) {
      return false;
    }
    
    return true;
  };
  
  // Redirect to dashboard only if user is authenticated AND has completed registration
  useEffect(() => {
    if (isAuthenticated && user && isRegistrationComplete(user)) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, user, setLocation]);

  const handleComplete = () => {
    setLocation("/dashboard");
  };

  const handleBack = () => {
    setLocation("/");
  };

  const handleNavigateTerms = () => {
    setLocation("/terms");
  };

  const handleNavigatePrivacy = () => {
    setLocation("/privacy");
  };
  
  return (
    <AuthFlow 
      onComplete={handleComplete}
      onBack={handleBack}
      onNavigateTerms={handleNavigateTerms}
      onNavigatePrivacy={handleNavigatePrivacy}
    />
  );
}