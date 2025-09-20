import { useLocation } from "wouter";
import AuthFlow from "@/components/AuthFlow";

interface AuthWrapperProps {
  onAuthComplete: () => void;
}

export default function AuthWrapper({ onAuthComplete }: AuthWrapperProps) {
  const [, setLocation] = useLocation();
  
  const handleComplete = () => {
    onAuthComplete();
    setLocation("/dashboard");
  };
  
  return (
    <AuthFlow
      onComplete={handleComplete}
      onBack={() => setLocation("/")}
      onNavigateTerms={() => setLocation("/terms")}
      onNavigatePrivacy={() => setLocation("/privacy")}
      onVerificationFailed={() => {
        setLocation("/dashboard");
      }}
    />
  );
}