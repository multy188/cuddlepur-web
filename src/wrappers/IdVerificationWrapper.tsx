import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import IdVerificationForm from '@/components/IdVerificationForm';

export default function IdVerificationWrapper() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect to auth if not authenticated
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Redirect to basic info if user hasn't completed basic info
    if (user && (!user.firstName || !user.lastName || !user.dateOfBirth)) {
      navigate('/setup/basic-info');
      return;
    }

    // Skip to dashboard if user is already ID verified
    if (user && user.isIdVerified) {
      navigate('/dashboard');
    }
  }, [user, isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pb-24">
      <div className="flex items-center justify-center min-h-full">
        <IdVerificationForm />
      </div>
    </div>
  );
}