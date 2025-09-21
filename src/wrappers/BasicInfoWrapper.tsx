import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import BasicInfoForm from '@/components/BasicInfoForm';

export default function BasicInfoWrapper() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to auth if not authenticated
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Redirect to dashboard if user already has basic info
    if (user && user.firstName && user.lastName && user.dateOfBirth) {
      navigate('/dashboard');
    }
  }, [user, isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pb-24">
      <div className="flex items-center justify-center min-h-full">
        <BasicInfoForm />
      </div>
    </div>
  );
}