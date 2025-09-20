import { useState } from "react";
import { useLocation } from "wouter";
import Dashboard from "@/components/Dashboard";

export default function DashboardWrapper() {
  const [, setLocation] = useLocation();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
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
  
  return (
    <Dashboard
      userName="Alex"
      onNavigate={handleNavigation}
      onSelectUser={handleSelectUser}
      onOpenFilters={() => setIsFiltersOpen(true)}
      verificationStatus="pending"
    />
  );
}