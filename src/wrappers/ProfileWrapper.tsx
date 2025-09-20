import { useLocation } from "wouter";
import Profile from "@/components/Profile";

export default function ProfileWrapper() {
  const [, setLocation] = useLocation();
  
  const handleSignOut = () => {
    // Clear auth state here if needed
    setLocation("/");
  };
  
  const handleBack = () => {
    setLocation("/dashboard");
  };
  
  return (
    <Profile
      onSignOut={handleSignOut}
      onBack={handleBack}
      initialEditMode={false}
    />
  );
}