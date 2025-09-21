import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/components/Dashboard";

export default function DashboardWrapper() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect if not properly authenticated or missing required info
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        setLocation("/auth");
        return;
      }

      // Check if user has completed basic info
      if (!user.firstName || !user.lastName || !user.dateOfBirth) {
        setLocation("/setup/basic-info");
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, setLocation]);

  // Show loading state while checking authentication
  if (isLoading || !user) {
    return null;
  }
  
  const handleNavigation = (path: string) => {
    const routes: Record<string, string> = {
      'search': '/search',
      'bookings': '/bookings',
      'messages': '/messages',
      'profile': '/profile',
      'safety-center': '/safety-center',
      'help-support': '/help',
      'professional-dashboard': '/professional-dashboard'
    };
    setLocation(routes[path] || '/dashboard');
  };
  
  const handleSelectUser = (userId: string) => {
    setLocation(`/professional/${userId}`);
  };
  
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
  const verificationStatus = 'verified'; // All users are considered verified after registration

  return (
    <Dashboard
      userName={fullName}
      onNavigate={handleNavigation}
      onSelectUser={handleSelectUser}
      verificationStatus={verificationStatus}
    />
  );
}