import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  DollarSign, 
  TrendingUp,
  Download,
  Calendar,
  CreditCard,
  Wallet,
  Receipt,
  PieChart,
  BarChart3,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EarningsAnalyticsProps {
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'bank' | 'mobile_money' | 'paypal';
  name: string;
  details: string;
  isDefault: boolean;
}

interface Transaction {
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

interface Receipt {
  id: string;
  date: string;
  client: string;
  amount: number;
  status: 'generated' | 'sent' | 'viewed';
  downloadUrl: string;
}

export default function EarningsAnalytics({ onBack }: EarningsAnalyticsProps) {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  // Mock data - in real app this would come from API
  const earningsData = {
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

  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: 'bank',
      name: 'GCB Bank',
      details: '****1234',
      isDefault: true
    },
    {
      id: "2", 
      type: 'mobile_money',
      name: 'MTN Mobile Money',
      details: '+233 24 ***4567',
      isDefault: false
    },
    {
      id: "3",
      type: 'paypal',
      name: 'PayPal',
      details: 'a***@email.com',
      isDefault: false
    }
  ];

  const transactions: Transaction[] = [
    {
      id: "txn_001",
      date: "2024-09-20",
      client: "Sarah Mitchell",
      service: "City Tour Companion",
      duration: 3,
      grossAmount: 150,
      commission: 15,
      netAmount: 135,
      status: 'completed',
      receiptId: "RCP_001"
    },
    {
      id: "txn_002",
      date: "2024-09-19",
      client: "Michael Asante", 
      service: "Business Dinner",
      duration: 2.5,
      grossAmount: 125,
      commission: 12.5,
      netAmount: 112.5,
      status: 'completed',
      receiptId: "RCP_002"
    },
    {
      id: "txn_003",
      date: "2024-09-18",
      client: "Jennifer Osei",
      service: "Photography Session",
      duration: 4,
      grossAmount: 180,
      commission: 18,
      netAmount: 162,
      status: 'pending',
      receiptId: "RCP_003"
    }
  ];

  const receipts: Receipt[] = [
    {
      id: "RCP_001",
      date: "2024-09-20",
      client: "Sarah Mitchell",
      amount: 150,
      status: 'viewed',
      downloadUrl: "/receipts/RCP_001.pdf"
    },
    {
      id: "RCP_002", 
      date: "2024-09-19",
      client: "Michael Asante",
      amount: 125,
      status: 'sent',
      downloadUrl: "/receipts/RCP_002.pdf"
    },
    {
      id: "RCP_003",
      date: "2024-09-18", 
      client: "Jennifer Osei",
      amount: 180,
      status: 'generated',
      downloadUrl: "/receipts/RCP_003.pdf"
    }
  ];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReceiptStatusColor = (status: string) => {
    switch (status) {
      case 'viewed': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'generated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleWithdrawal = () => {
    console.log('Requesting withdrawal:', withdrawalAmount);
    // In real app, make API call to process withdrawal
    setWithdrawalAmount('');
  };

  const downloadReceipt = (receiptId: string) => {
    console.log('Downloading receipt:', receiptId);
    // In real app, trigger file download
  };

  const downloadTaxSummary = () => {
    console.log('Downloading tax summary');
    // In real app, generate and download tax summary
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="font-semibold">Earnings & Analytics</h1>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadTaxSummary}
              data-testid="button-download-tax-summary"
            >
              <Download className="w-4 h-4 mr-1" />
              Tax Summary
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-4xl">
        {/* Earnings Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold" data-testid="earnings-this-month">
                    ${earningsData.thisMonth.net}
                  </p>
                  <p className="text-sm text-green-600">
                    +{earningsData.thisMonth.growth}% from last month
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold" data-testid="available-balance">
                    ${earningsData.availableBalance}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ready for withdrawal
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                  <p className="text-2xl font-bold" data-testid="pending-payments">
                    ${earningsData.pendingPayments}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Processing
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600" data-testid="total-sessions">
                  {earningsData.totalSessions}
                </p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600" data-testid="avg-session">
                  {earningsData.averageSession}h
                </p>
                <p className="text-sm text-muted-foreground">Avg Session</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600" data-testid="avg-rate">
                  ${earningsData.averageRate}
                </p>
                <p className="text-sm text-muted-foreground">Avg Rate/Hour</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600" data-testid="total-earnings">
                  ${earningsData.totalEarnings}
                </p>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Commission Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Gross Earnings</span>
                <span className="font-semibold" data-testid="gross-earnings">
                  ${earningsData.thisMonth.gross}
                </span>
              </div>
              <div className="flex justify-between items-center text-red-600">
                <span>Platform Commission (10%)</span>
                <span className="font-semibold" data-testid="commission-amount">
                  -${earningsData.thisMonth.commission}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Net Earnings</span>
                  <span data-testid="net-earnings">
                    ${earningsData.thisMonth.net}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Withdrawal Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="withdrawal-amount">Withdrawal Amount</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="withdrawal-amount"
                    placeholder="Enter amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    data-testid="input-withdrawal-amount"
                  />
                  <Button 
                    onClick={handleWithdrawal}
                    disabled={!withdrawalAmount || parseFloat(withdrawalAmount) > earningsData.availableBalance}
                    data-testid="button-request-withdrawal"
                  >
                    Request Withdrawal
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Available: ${earningsData.availableBalance}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">Payment Methods</h4>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id} 
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${method.id}`}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" data-testid="button-add-payment-method">
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Session History & Payments
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                    data-testid="input-search-transactions"
                  />
                </div>
                <Select value={timeFilter} onValueChange={(value: any) => setTimeFilter(value)}>
                  <SelectTrigger className="w-32" data-testid="select-time-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium" data-testid={`transaction-client-${transaction.id}`}>
                        {transaction.client}
                      </span>
                      <Badge 
                        className={getStatusColor(transaction.status)}
                        data-testid={`transaction-status-${transaction.id}`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{transaction.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date} • {transaction.duration}h
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" data-testid={`transaction-amount-${transaction.id}`}>
                      ${transaction.netAmount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Gross: ${transaction.grossAmount}
                    </p>
                    <p className="text-xs text-red-600">
                      Commission: -${transaction.commission}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => downloadReceipt(transaction.receiptId)}
                      data-testid={`button-download-receipt-${transaction.id}`}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Receipt Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Receipt Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {receipts.map((receipt) => (
                <div 
                  key={receipt.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium" data-testid={`receipt-id-${receipt.id}`}>
                        {receipt.id}
                      </span>
                      <Badge 
                        className={getReceiptStatusColor(receipt.status)}
                        data-testid={`receipt-status-${receipt.id}`}
                      >
                        {receipt.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{receipt.client}</p>
                    <p className="text-xs text-muted-foreground">{receipt.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" data-testid={`receipt-amount-${receipt.id}`}>
                      ${receipt.amount}
                    </p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => downloadReceipt(receipt.id)}
                      data-testid={`button-download-${receipt.id}`}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      data-testid={`button-view-${receipt.id}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}