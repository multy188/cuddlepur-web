export interface PaymentMethod {
  id: string;
  type: 'bank' | 'mobile_money' | 'paypal';
  name: string;
  details: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  client: string;
  service: string;
  duration: number;
  grossAmount: number;
  commission: number;
  netAmount: number;
  status: 'completed' | 'pending' | 'refunded';
  receiptId: string;
}

export interface Receipt {
  id: string;
  date: string;
  client: string;
  amount: number;
  status: 'generated' | 'sent' | 'viewed';
  downloadUrl: string;
}