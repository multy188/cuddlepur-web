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
    
    // Check photos step completion (either has photos or explicitly skipped)
    if (!user.photos?.length && !user.photosSkipped) {
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

 


  
  return (
    <AuthFlow 
    />
  );
}