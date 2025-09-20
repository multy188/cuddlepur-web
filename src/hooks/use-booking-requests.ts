import { useState, useMemo, useCallback } from 'react';
import { mockBookingRequests } from '@mock/bookingRequests';
import type { BookingRequest } from '@types';

export function useBookingRequests() {
  const [bookingRequests] = useState<BookingRequest[]>(mockBookingRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

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
  };
}