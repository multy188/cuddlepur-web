import { useState, useMemo, useCallback } from 'react';
import { useBookings, useBooking, useUpdateBookingStatus } from './useApi';
import type { BookingRequest } from '@types';

export function useBookingRequests() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Map API status to frontend status
  const apiStatus = filter === 'pending' ? 'PENDING' : 
                   filter === 'accepted' ? 'CONFIRMED' : 
                   filter === 'declined' ? 'CANCELLED' : undefined;
  
  const { data, isLoading, error } = useBookings(apiStatus);
  const updateBookingStatus = useUpdateBookingStatus();

  const bookingRequests = useMemo(() => {
    return data?.bookings?.map((booking: any) => ({
      id: booking.id,
      client: {
        name: booking.client.firstName && booking.client.lastName 
          ? `${booking.client.firstName} ${booking.client.lastName}` 
          : 'Client',
        profileImage: booking.client.profilePicture || '/default-avatar.png',
        rating: 4.8,
        joinedDate: new Date(booking.createdAt).toLocaleDateString()
      },
      professional: {
        name: booking.professional.firstName && booking.professional.lastName 
          ? `${booking.professional.firstName} ${booking.professional.lastName}` 
          : 'Professional',
        profileImage: booking.professional.profilePicture || '/default-avatar.png'
      },
      requestedDate: new Date(booking.scheduledDate).toLocaleDateString(),
      requestedTime: new Date(booking.startTime).toLocaleTimeString(),
      duration: `${booking.duration} minutes`,
      location: booking.location || 'Location not specified',
      totalAmount: Number(booking.totalAmount),
      status: booking.status === 'PENDING' ? 'pending' : 
              booking.status === 'CONFIRMED' ? 'accepted' : 
              booking.status === 'CANCELLED' ? 'declined' : 'pending',
      notes: booking.clientNotes || '',
      createdAt: booking.createdAt,
      serviceType: booking.serviceType
    })) || [];
  }, [data?.bookings]);

  const filteredRequests = useMemo(() => {
    return bookingRequests.filter(request => {
      const matchesFilter = filter === 'all' || request.status === filter;
      const matchesSearch = request.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           request.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [bookingRequests, filter, searchQuery]);

  const getRequestById = useCallback((id: string) => {
    return bookingRequests.find(request => request.id === id);
  }, [bookingRequests]);

  const getRequestsByStatus = useCallback((status: BookingRequest['status']) => {
    return bookingRequests.filter(request => request.status === status);
  }, [bookingRequests]);

  const pendingCount = useMemo(() => {
    return bookingRequests.filter(r => r.status === 'pending').length;
  }, [bookingRequests]);

  const acceptedCount = useMemo(() => {
    return bookingRequests.filter(r => r.status === 'accepted').length;
  }, [bookingRequests]);

  const declinedCount = useMemo(() => {
    return bookingRequests.filter(r => r.status === 'declined').length;
  }, [bookingRequests]);

  const handleStatusUpdate = useCallback(async (bookingId: string, newStatus: string) => {
    const apiStatus = newStatus === 'accepted' ? 'CONFIRMED' : 
                     newStatus === 'declined' ? 'CANCELLED' : newStatus;
    
    await updateBookingStatus.mutateAsync({ bookingId, status: apiStatus });
  }, [updateBookingStatus]);

  return {
    bookingRequests,
    filteredRequests,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    getRequestById,
    getRequestsByStatus,
    pendingCount,
    acceptedCount,
    declinedCount,
    totalCount: bookingRequests.length,
    isLoading,
    error,
    updateStatus: handleStatusUpdate,
    isUpdating: updateBookingStatus.isPending
  };
}

export function useBookingRequest(id: string) {
  const { data, isLoading, error } = useBooking(id);
  
  if (!data?.booking) {
    return { bookingRequest: null, isLoading, error };
  }

  const booking = data.booking;
  const bookingRequest = {
    id: booking.id,
    client: {
      name: booking.client.firstName && booking.client.lastName 
        ? `${booking.client.firstName} ${booking.client.lastName}` 
        : 'Client',
      profileImage: booking.client.profilePicture || '/default-avatar.png',
      rating: 4.8,
      joinedDate: new Date(booking.createdAt).toLocaleDateString()
    },
    professional: {
      name: booking.professional.firstName && booking.professional.lastName 
        ? `${booking.professional.firstName} ${booking.professional.lastName}` 
        : 'Professional',
      profileImage: booking.professional.profilePicture || '/default-avatar.png'
    },
    requestedDate: new Date(booking.scheduledDate).toLocaleDateString(),
    requestedTime: new Date(booking.startTime).toLocaleTimeString(),
    duration: `${booking.duration} minutes`,
    location: booking.location || 'Location not specified',
    totalAmount: Number(booking.totalAmount),
    status: booking.status === 'PENDING' ? 'pending' : 
            booking.status === 'CONFIRMED' ? 'accepted' : 
            booking.status === 'CANCELLED' ? 'declined' : 'pending',
    notes: booking.clientNotes || '',
    createdAt: booking.createdAt,
    serviceType: booking.serviceType
  };

  return { bookingRequest, isLoading, error };
}