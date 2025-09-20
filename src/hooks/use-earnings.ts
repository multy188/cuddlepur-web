import { useState, useMemo, useCallback } from 'react';
import { earningsData, paymentMethods, transactions, receipts } from '@mock/earnings';
import type { PaymentMethod, Transaction, Receipt } from '@types';

export function useEarnings() {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction =>
      transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getTransactionById = useCallback((id: string) => {
    return transactions.find(transaction => transaction.id === id);
  }, []);

  const getReceiptById = useCallback((id: string) => {
    return receipts.find(receipt => receipt.id === id);
  }, []);

  const getTransactionsByStatus = useCallback((status: Transaction['status']) => {
    return transactions.filter(transaction => transaction.status === status);
  }, []);

  const getTotalEarnings = useCallback((period: 'thisMonth' | 'lastMonth' | 'total') => {
    switch (period) {
      case 'thisMonth':
        return earningsData.thisMonth.net;
      case 'lastMonth':
        return earningsData.lastMonth.net;
      case 'total':
        return earningsData.totalEarnings;
      default:
        return 0;
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const getReceiptStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'viewed': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'generated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const handleWithdrawal = useCallback(() => {
    console.log('Requesting withdrawal:', withdrawalAmount);
    // In real app, make API call to process withdrawal
    setWithdrawalAmount('');
  }, [withdrawalAmount]);

  const downloadReceipt = useCallback((receiptId: string) => {
    console.log('Downloading receipt:', receiptId);
    // In real app, trigger file download
  }, []);

  const downloadTaxSummary = useCallback(() => {
    console.log('Downloading tax summary');
    // In real app, generate and download tax summary
  }, []);

  return {
    earningsData,
    paymentMethods,
    transactions,
    receipts,
    filteredTransactions,
    timeFilter,
    setTimeFilter,
    searchQuery,
    setSearchQuery,
    withdrawalAmount,
    setWithdrawalAmount,
    getTransactionById,
    getReceiptById,
    getTransactionsByStatus,
    getTotalEarnings,
    getStatusColor,
    getReceiptStatusColor,
    handleWithdrawal,
    downloadReceipt,
    downloadTaxSummary,
  };
}