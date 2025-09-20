import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  Smartphone, 
  Building, 
  Shield, 
  AlertTriangle, 
  Clock,
  DollarSign,
  User,
  Calendar,
  MapPin
} from "lucide-react";
import { format } from "date-fns";

interface BookingData {
  id: string;
  professional: {
    id: string;
    name: string;
    profileImage: string;
    isVerified: boolean;
  };
  date: string;
  timeSlot: string;
  duration: number;
  location: string;
  totalAmount: number;
  platformFee: number;
  sessionAmount: number;
}

interface BookingPaymentProps {
  booking: BookingData;
  onBack: () => void;
  onPaymentComplete: (paymentData: any) => void;
  onSkipPayment: () => void;
}

export default function BookingPayment({ booking, onBack, onPaymentComplete, onSkipPayment }: BookingPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const paymentMethods = [
    { 
      value: "card", 
      label: "Credit/Debit Card", 
      icon: CreditCard,
      description: "Visa, Mastercard, American Express"
    },
    { 
      value: "mobile_money", 
      label: "Mobile Money", 
      icon: Smartphone,
      description: "MTN Mobile Money, Vodafone Cash, AirtelTigo Money"
    },
    { 
      value: "bank_transfer", 
      label: "Bank Transfer", 
      icon: Building,
      description: "Direct bank transfer"
    }
  ];

  const handlePayment = async () => {
    if (!paymentMethod) return;

    setIsProcessing(true);
    
    const paymentData = {
      bookingId: booking.id,
      paymentMethod,
      amount: booking.totalAmount,
      cardNumber: paymentMethod === "card" ? cardNumber : undefined,
      mobileNumber: paymentMethod === "mobile_money" ? mobileNumber : undefined,
      bankAccount: paymentMethod === "bank_transfer" ? bankAccount : undefined
    };

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onPaymentComplete(paymentData);
    setIsProcessing(false);
  };

  const canPay = paymentMethod && (
    (paymentMethod === "card" && cardNumber && expiryDate && cvv && cardName) ||
    (paymentMethod === "mobile_money" && mobileNumber) ||
    (paymentMethod === "bank_transfer" && bankAccount)
  );

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
            
            <h1 className="font-semibold">Payment</h1>
            
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Booking Accepted Banner */}
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Booking Accepted!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  {booking.professional.name} has accepted your booking request
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={booking.professional.profileImage} alt={booking.professional.name} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold" data-testid="professional-name">
                    {booking.professional.name}
                  </h4>
                  {booking.professional.isVerified && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span data-testid="booking-date">{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span data-testid="booking-time">{getTimeLabel(booking.timeSlot)} • {booking.duration}h</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span data-testid="booking-location">{booking.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amount Due */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Amount Due
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Session ({booking.duration} hours)</span>
              <span data-testid="session-amount">${booking.sessionAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Platform fee</span>
              <span data-testid="platform-fee">${booking.platformFee}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold text-xl">
                <span>Total</span>
                <span data-testid="total-amount">${booking.totalAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div key={method.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <RadioGroupItem 
                    value={method.value} 
                    id={method.value}
                    data-testid={`radio-payment-${method.value}`}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={method.value} className="cursor-pointer flex items-center gap-2 font-medium">
                      <method.icon className="w-4 h-4" />
                      {method.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Form */}
        {paymentMethod && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethod === "card" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      data-testid="input-card-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      data-testid="input-card-number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        data-testid="input-expiry"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        data-testid="input-cvv"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "mobile_money" && (
                <div className="space-y-2">
                  <Label htmlFor="mobile-number">Mobile Number</Label>
                  <Input
                    id="mobile-number"
                    placeholder="+233 XX XXX XXXX"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    data-testid="input-mobile-number"
                  />
                </div>
              )}

              {paymentMethod === "bank_transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="bank-account">Bank Account Number</Label>
                  <Input
                    id="bank-account"
                    placeholder="Account number"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    data-testid="input-bank-account"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cancellation Policy */}
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <AlertTriangle className="w-5 h-5" />
              Cancellation Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-orange-700 dark:text-orange-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel 12+ hours before: Full refund</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Cancel less than 12 hours: 50% refund</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Badges */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Secure Payment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Actions */}
        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            disabled={!canPay || isProcessing}
            className="w-full"
            size="lg"
            data-testid="button-pay-now"
          >
            {isProcessing ? "Processing Payment..." : `Pay Now - $${booking.totalAmount}`}
          </Button>
          
          <Button
            variant="outline"
            onClick={onSkipPayment}
            className="w-full"
            data-testid="button-skip-payment"
          >
            Skip Payment (Pay Later)
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            If you skip payment now, your booking may be automatically cancelled after 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}