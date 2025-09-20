import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Printer, 
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Building
} from "lucide-react";
import { format } from "date-fns";

interface ReceiptData {
  id: string;
  transactionId: string;
  bookingId: string;
  professional: {
    name: string;
    profileImage: string;
  };
  customer: {
    name: string;
    email: string;
  };
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  sessionAmount: number;
  platformFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentTimestamp: string;
  status: "paid" | "refunded";
}

interface ReceiptProps {
  receipt: ReceiptData;
  onBack: () => void;
  onDownload: () => void;
  onEmailReceipt: () => void;
  onPrint: () => void;
}

export default function Receipt({ receipt, onBack, onDownload, onEmailReceipt, onPrint }: ReceiptProps) {
  const getTimeLabel = (timeSlot: string) => {
    const timeLabels: Record<string, string> = {
      "08:00": "8:00 AM",
      "09:00": "9:00 AM", 
      "10:00": "10:00 AM",
      "11:00": "11:00 AM",
      "12:00": "12:00 PM",
      "13:00": "1:00 PM",
      "14:00": "2:00 PM",
      "15:00": "3:00 PM",
      "16:00": "4:00 PM",
      "17:00": "5:00 PM",
      "18:00": "6:00 PM",
      "19:00": "7:00 PM",
      "20:00": "8:00 PM",
      "21:00": "9:00 PM"
    };
    return timeLabels[timeSlot] || timeSlot;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b print:hidden">
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
            
            <h1 className="font-semibold">Receipt</h1>
            
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Receipt Header */}
        <Card className="print:shadow-none print:border-none">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-primary">CuddlePur</h2>
            </div>
            <Badge variant="secondary" className="gap-1 mx-auto">
              <CheckCircle className="w-3 h-3" />
              {receipt.status === "paid" ? "Payment Confirmed" : "Refunded"}
            </Badge>
            <CardTitle className="text-xl mt-2">Payment Receipt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono font-semibold" data-testid="transaction-id">
                {receipt.transactionId}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Booking ID</p>
              <p className="font-mono" data-testid="booking-id">
                {receipt.bookingId}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Professional</p>
                <p className="font-medium" data-testid="professional-name">
                  {receipt.professional.name}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-medium" data-testid="customer-name">
                  {receipt.customer.name}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium" data-testid="session-date">
                    {receipt.date}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time & Duration</p>
                  <p className="font-medium" data-testid="session-time">
                    {getTimeLabel(receipt.timeSlot)} • {receipt.duration}h
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium" data-testid="session-location">
                    {receipt.location}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Session ({receipt.duration} hours)</span>
                <span data-testid="session-amount">${receipt.sessionAmount}</span>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Platform Service Fee (10%)</span>
                <span data-testid="platform-fee">${receipt.platformFee}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount {receipt.status === "refunded" ? "Refunded" : "Paid"}</span>
                <span data-testid="total-amount">${receipt.totalAmount}</span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium capitalize" data-testid="payment-method">
                  {receipt.paymentMethod.replace("_", " ")}
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">Payment Date</p>
                <p className="font-medium" data-testid="payment-timestamp">
                  {format(new Date(receipt.paymentTimestamp), "PPP p")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:hidden">
          <Button
            variant="outline"
            onClick={onDownload}
            className="flex items-center gap-2"
            data-testid="button-download"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={onEmailReceipt}
            className="flex items-center gap-2"
            data-testid="button-email"
          >
            <Mail className="w-4 h-4" />
            Email Receipt
          </Button>
          
          <Button
            variant="outline"
            onClick={onPrint}
            className="flex items-center gap-2"
            data-testid="button-print"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
        </div>

        {/* Contact Information */}
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p className="font-medium">Customer Support</p>
              <p>Email: support@cuddlepur.com</p>
              <p>Phone: +233 XX XXX XXXX</p>
              <p className="text-xs mt-2">
                This is an official receipt from CuddlePur Platform Services
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Print Styles */}
        <style>{`
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .print\\:hidden {
              display: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            .print\\:border-none {
              border: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}