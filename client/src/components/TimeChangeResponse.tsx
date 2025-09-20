import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon,
  Clock, 
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";

interface TimeChangeRequestData {
  id: string;
  bookingId: string;
  customer: {
    name: string;
    profileImage: string;
  };
  currentDate: string;
  currentTimeSlot: string;
  requestedDate: string;
  requestedTimeSlot: string;
  duration: number;
  reason: string;
  additionalNotes?: string;
  createdAt: string;
}

interface TimeChangeResponseProps {
  request: TimeChangeRequestData;
  onBack: () => void;
  onAccept: (responseData: any) => void;
  onDecline: (responseData: any) => void;
  onCounterOffer: (responseData: any) => void;
}

export default function TimeChangeResponse({ 
  request, 
  onBack, 
  onAccept, 
  onDecline, 
  onCounterOffer 
}: TimeChangeResponseProps) {
  const [responseType, setResponseType] = useState<"accept" | "decline" | "counter" | "">("");
  const [responseMessage, setResponseMessage] = useState("");
  const [counterDate, setCounterDate] = useState<Date | undefined>(undefined);
  const [counterTimeSlot, setCounterTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { value: "08:00", label: "8:00 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "21:00", label: "9:00 PM" }
  ];

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

  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      schedule_conflict: "Schedule Conflict",
      work_commitment: "Work Commitment", 
      personal_emergency: "Personal Emergency",
      travel_delay: "Travel Delay",
      health_issue: "Health Issue",
      weather_conditions: "Weather Conditions",
      other: "Other"
    };
    return labels[reason] || reason;
  };

  const hasConflict = () => {
    // Simple conflict detection - in real app, this would check against professional's calendar
    if (!counterDate || !counterTimeSlot) return false;
    
    const selectedDate = format(counterDate, "yyyy-MM-dd");
    // Example: conflict with existing bookings
    return false; // Simplified for demo
  };

  const handleSubmit = async () => {
    if (!responseType) return;
    
    if (responseType === "counter" && (!counterDate || !counterTimeSlot)) return;

    setIsSubmitting(true);
    
    const responseData = {
      requestId: request.id,
      bookingId: request.bookingId,
      responseType,
      responseMessage,
      counterOffer: responseType === "counter" ? {
        date: format(counterDate!, "yyyy-MM-dd"),
        timeSlot: counterTimeSlot
      } : undefined
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (responseType === "accept") {
      onAccept(responseData);
    } else if (responseType === "decline") {
      onDecline(responseData);
    } else {
      onCounterOffer(responseData);
    }
    
    setIsSubmitting(false);
  };

  const canSubmit = responseType && 
    (responseType !== "counter" || (counterDate && counterTimeSlot && !hasConflict()));

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
            
            <h1 className="font-semibold">Time Change Request</h1>
            
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Request Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Request Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium" data-testid="customer-name">
                  {request.customer.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Requested on {format(new Date(request.createdAt), "PPP")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Current Time</Label>
                <p className="font-medium" data-testid="current-time">
                  {request.currentDate}
                </p>
                <p className="text-sm">
                  {getTimeLabel(request.currentTimeSlot)} • {request.duration}h
                </p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Requested Time</Label>
                <p className="font-medium" data-testid="requested-time">
                  {request.requestedDate}
                </p>
                <p className="text-sm">
                  {getTimeLabel(request.requestedTimeSlot)} • {request.duration}h
                </p>
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Reason</Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" data-testid="change-reason">
                  {getReasonLabel(request.reason)}
                </Badge>
              </div>
            </div>

            {request.additionalNotes && (
              <div>
                <Label className="text-muted-foreground">Additional Notes</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md" data-testid="additional-notes">
                  {request.additionalNotes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Response Options */}
        <Card>
          <CardHeader>
            <CardTitle>Your Response</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={responseType} onValueChange={(value) => setResponseType(value as "accept" | "decline" | "counter" | "")}>
              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem 
                  value="accept" 
                  id="accept"
                  data-testid="radio-accept"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="accept" className="cursor-pointer flex items-center gap-2 font-medium text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    Accept Request
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Approve the time change to {request.requestedDate} • {getTimeLabel(request.requestedTimeSlot)}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem 
                  value="decline" 
                  id="decline"
                  data-testid="radio-decline"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="decline" className="cursor-pointer flex items-center gap-2 font-medium text-red-700">
                    <XCircle className="w-4 h-4" />
                    Decline Request
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Keep the original booking time
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 border rounded-lg">
                <RadioGroupItem 
                  value="counter" 
                  id="counter"
                  data-testid="radio-counter"
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="counter" className="cursor-pointer flex items-center gap-2 font-medium text-blue-700">
                    <RefreshCw className="w-4 h-4" />
                    Counter Offer
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Suggest an alternative date and time
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Counter Offer Options */}
        {responseType === "counter" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Counter Offer Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-counter-date-picker"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {counterDate ? format(counterDate, "PPP") : "Select alternative date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={counterDate}
                      onSelect={setCounterDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Counter Offer Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <div key={slot.value}>
                      <input
                        type="radio"
                        id={`counter-${slot.value}`}
                        name="counterTimeSlot"
                        value={slot.value}
                        checked={counterTimeSlot === slot.value}
                        onChange={(e) => setCounterTimeSlot(e.target.value)}
                        className="sr-only"
                        data-testid={`radio-counter-time-${slot.value}`}
                      />
                      <Label
                        htmlFor={`counter-${slot.value}`}
                        className={`
                          flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors text-sm
                          ${counterTimeSlot === slot.value
                            ? 'border-primary bg-primary/10 text-primary font-medium'
                            : 'border-border hover:border-primary/50 hover:bg-muted'
                          }
                        `}
                      >
                        {slot.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {hasConflict() && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700 dark:text-red-300">
                  This time conflicts with another booking. Please select a different time.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        {/* Response Message */}
        <Card>
          <CardHeader>
            <CardTitle>Response Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={
                responseType === "accept" ? "Add a message confirming the time change..." :
                responseType === "decline" ? "Explain why you cannot accommodate this change..." :
                responseType === "counter" ? "Explain your alternative suggestion..." :
                "Add a message to your response..."
              }
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              className="min-h-[100px]"
              data-testid="textarea-response-message"
            />
          </CardContent>
        </Card>

        {/* Summary */}
        {responseType && (
          <Card className={`border-2 ${
            responseType === "accept" ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" :
            responseType === "decline" ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950" :
            "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
          }`}>
            <CardHeader>
              <CardTitle className={
                responseType === "accept" ? "text-green-800 dark:text-green-200" :
                responseType === "decline" ? "text-red-800 dark:text-red-200" :
                "text-blue-800 dark:text-blue-200"
              }>
                {responseType === "accept" ? "Accepting Request" :
                 responseType === "decline" ? "Declining Request" :
                 "Counter Offer"}
              </CardTitle>
            </CardHeader>
            <CardContent className={
              responseType === "accept" ? "text-green-700 dark:text-green-300" :
              responseType === "decline" ? "text-red-700 dark:text-red-300" :
              "text-blue-700 dark:text-blue-300"
            }>
              {responseType === "accept" && (
                <p>The booking will be changed to <strong>{request.requestedDate} • {getTimeLabel(request.requestedTimeSlot)}</strong></p>
              )}
              {responseType === "decline" && (
                <p>The booking will remain at <strong>{request.currentDate} • {getTimeLabel(request.currentTimeSlot)}</strong></p>
              )}
              {responseType === "counter" && counterDate && counterTimeSlot && (
                <p>Suggesting alternative time: <strong data-testid="counter-offer-summary">{format(counterDate, "PPP")} • {getTimeLabel(counterTimeSlot)}</strong></p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`w-full ${
            responseType === "accept" ? "bg-green-600 hover:bg-green-700" :
            responseType === "decline" ? "bg-red-600 hover:bg-red-700" :
            ""
          }`}
          size="lg"
          data-testid="button-send-response"
        >
          {isSubmitting ? "Sending Response..." : 
           responseType === "accept" ? "Accept Time Change" :
           responseType === "decline" ? "Decline Request" :
           responseType === "counter" ? "Send Counter Offer" :
           "Send Response"}
        </Button>

        {!canSubmit && (
          <p className="text-sm text-muted-foreground text-center">
            Please complete your response before sending
          </p>
        )}
      </div>
    </div>
  );
}