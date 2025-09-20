import { useCallback } from 'react';
import { safetyGuidelines, emergencyContacts } from '@mock/safetyData';
import type { SafetyGuideline, EmergencyContact } from '@types';

export function useSafety() {
  const callEmergencyNumber = useCallback((number: string) => {
    // In a real app, this might trigger a native call or redirect
    console.log(`Calling emergency number: ${number}`);
    window.open(`tel:${number}`, '_self');
  }, []);

  const reportIncident = useCallback((incidentData: {
    type: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
    location?: string;
  }) => {
    // In a real app, this would send the report to the API
    console.log('Reporting incident:', incidentData);
    
    // Return a promise to simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, reportId: Date.now().toString() });
      }, 1000);
    });
  }, []);

  const getGuidelinesByCategory = useCallback((category?: string) => {
    if (!category) return safetyGuidelines;
    
    // In a real app, guidelines might have categories
    return safetyGuidelines.filter(guideline => 
      guideline.title.toLowerCase().includes(category.toLowerCase())
    );
  }, []);

  const searchGuidelines = useCallback((query: string) => {
    if (!query.trim()) return safetyGuidelines;
    
    return safetyGuidelines.filter(guideline =>
      guideline.title.toLowerCase().includes(query.toLowerCase()) ||
      guideline.description.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  const getEmergencyContactByService = useCallback((serviceName: string) => {
    return emergencyContacts.find(contact =>
      contact.name.toLowerCase().includes(serviceName.toLowerCase())
    );
  }, []);

  const shareLocation = useCallback(() => {
    // In a real app, this would get user's location and share it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Sharing location:', { latitude, longitude });
          
          // In a real app, send this to emergency contacts or support
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  }, []);

  return {
    safetyGuidelines,
    emergencyContacts,
    callEmergencyNumber,
    reportIncident,
    getGuidelinesByCategory,
    searchGuidelines,
    getEmergencyContactByService,
    shareLocation,
    
    // Computed values
    totalGuidelines: safetyGuidelines.length,
    totalEmergencyContacts: emergencyContacts.length,
  };
}