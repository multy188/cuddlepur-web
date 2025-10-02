import { useLocation } from "wouter";
import { useSignOut } from "@/hooks/useAuth";
import Profile from "@/components/Profile";

export default function ProfileWrapper() {
  const [, setLocation] = useLocation();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      setLocation("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      // Still redirect to home even if API call fails
      setLocation("/");
    }
  };

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const handleApplyProfessional = () => {
    setLocation("/setup/id-verification");
  };

  return (
    <Profile
      onSignOut={handleSignOut}
      onBack={handleBack}
      initialEditMode={false}
      onApplyProfessional={handleApplyProfessional}
    />
  );
}