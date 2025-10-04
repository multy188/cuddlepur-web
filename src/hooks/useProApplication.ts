import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';

export const useProApplicationStatus = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['pro-application-status'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/professional/application-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch application status');
      }

      const data = await response.json();
      return data.application;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
