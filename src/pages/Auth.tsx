import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import AuthFlow from "@/components/AuthFlow";
import { useIsCompletedRegistration } from "@/hooks/useIsCompletedRegistration";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const isRegistrationComplete = useIsCompletedRegistration();

  // Redirect to dashboard only if user is authenticated AND has completed registration
  useEffect(() => {
    if (isAuthenticated && isRegistrationComplete) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, isRegistrationComplete, setLocation]);

  return <AuthFlow />;
}
