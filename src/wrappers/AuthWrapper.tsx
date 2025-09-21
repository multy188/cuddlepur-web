import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import PhoneAuth from "@/components/PhoneAuth";

export default function AuthWrapper() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);
  
  if (isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
      <PhoneAuth />
    </div>
  );
}