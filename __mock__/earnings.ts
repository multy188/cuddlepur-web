import type { PaymentMethod, Transaction, Receipt } from '@types';

export const earningsData = {
  thisMonth: {
    gross: 3450,
    commission: 345,
    net: 3105,
    growth: 18.5
  },
  lastMonth: {
    gross: 2910,
    commission: 291,
    net: 2619
  },
  totalEarnings: 28450,
  availableBalance: 1250,
  pendingPayments: 580,
  totalSessions: 156,
  averageSession: 2.3,
  averageRate: 52
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: 'bank',
    name: 'Ghana Commercial Bank',
    details: '****1234',
    isDefault: true
  },
  {
    id: "2", 
    type: 'mobile_money',
    name: 'MTN Mobile Money',
    details: '+233 ** *** 5678',
    isDefault: false
  }
];

export const transactions: Transaction[] = [
  {
    id: "txn1",
    date: "2024-09-19",
    client: "Sarah Mitchell",
    service: "City Tour Companion",
    duration: 2,
    grossAmount: 100,
    commission: 10,
    netAmount: 90,
    status: 'completed',
    receiptId: "rcpt1"
  },
  {
    id: "txn2",
    date: "2024-09-18",
    client: "Michael Asante",
    service: "Dinner Companion", 
    duration: 2,
    grossAmount: 100,
    commission: 10,
    netAmount: 90,
    status: 'completed',
    receiptId: "rcpt2"
  },
  {
    id: "txn3",
    date: "2024-09-17",
    client: "Jennifer Owusu",
    service: "Park Walk",
    duration: 3,
    grossAmount: 135,
    commission: 13.50,
    netAmount: 121.50,
    status: 'pending',
    receiptId: "rcpt3"
  }
];

export const receipts: Receipt[] = [
  {
    id: "rcpt1",
    date: "2024-09-19",
    client: "Sarah Mitchell", 
    amount: 90,
    status: 'sent',
    downloadUrl: '#'
  },
  {
    id: "rcpt2",
    date: "2024-09-18",
    client: "Michael Asante",
    amount: 90,
    status: 'viewed',
    downloadUrl: '#'
  }
];