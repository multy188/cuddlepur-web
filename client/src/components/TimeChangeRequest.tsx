import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon,
  Clock, 
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";

interface CurrentBooking {
  id: string;
  date: string;
  timeSlot: string;
  duration: number;
  professional: {
    name: string;
  };
}

interface TimeChangeRequestProps {
  booking: CurrentBooking;
  onBack: () => void;
  onSubmitRequest: (requestData: any) => void;
}

export default function TimeChangeRequest({ booking, onBack, onSubmitRequest }: TimeChangeRequestProps) {
  const [newDate, setNewDate] = useState<Date | undefined>(undefined);
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
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

  const reasonOptions = [
    { value: "schedule_conflict", label: "Schedule Conflict" },
    { value: "work_commitment", label: "Work Commitment" },
    { value: "personal_emergency", label: "Personal Emergency" },
    { value: "travel_delay", label: "Travel Delay" },
    { value: "health_issue", label: "Health Issue" },
    { value: "weather_conditions", label: "Weather Conditions" },
    { value: "other", label: "Other" }
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

  const hasConflict = () => {
    // Simple conflict detection - in real app, this would check against professional's availability
    if (!newDate || !newTimeSlot) return false;
    
    const selectedDate = format(newDate, "yyyy-MM-dd");
    const currentDate = booking.date;
    
    // Example: prevent booking same time slot on same day
    return selectedDate === currentDate && newTimeSlot === booking.timeSlot;
  };

  const handleSubmit = async () => {
    if (!newDate || !newTimeSlot || !reason) return;

    setIsSubmitting(true);
    
    const requestData = {
      bookingId: booking.id,
      currentDate: booking.date,
      currentTimeSlot: booking.timeSlot,
      newDate: format(newDate, "yyyy-MM-dd"),
      newTimeSlot,
      reason,
      additionalNotes
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmitRequest(requestData);
    setIsSubmitting(false);
  };

  const canSubmit = newDate && newTimeSlot && reason && !hasConflict();

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
            
            <h1 className="font-semibold">Request Time Change</h1>
            
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Current Booking Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Current Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Professional:</span>
                <span className="font-medium" data-testid="current-professional">
                  {booking.professional.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium" data-testid="current-date">
                  {booking.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium" data-testid="current-time">
                  {getTimeLabel(booking.timeSlot)} • {booking.duration}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              New Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-new-date-picker"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newDate ? format(newDate, "PPP") : "Select new date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newDate}
                  onSelect={setNewDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* New Time Slot Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              New Time Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {timeSlots.map((slot) => (
                <div key={slot.value}>
                  <input
                    type="radio"
                    id={`new-${slot.value}`}
                    name="newTimeSlot"
                    value={slot.value}
                    checked={newTimeSlot === slot.value}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="sr-only"
                    data-testid={`radio-new-time-${slot.value}`}
                  />
                  <Label
                    htmlFor={`new-${slot.value}`}
                    className={`
                      flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors text-sm
                      ${newTimeSlot === slot.value
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

        {/* Conflict Warning */}
        {hasConflict() && (
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              This is the same date and time as your current booking. Please select a different time.
            </AlertDescription>
          </Alert>
        )}

        {/* Reason Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Reason for Change</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger data-testid="select-reason">
                <SelectValue placeholder="Select reason for time change" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Provide any additional details about your time change request..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[100px]"
              data-testid="textarea-additional-notes"
            />
          </CardContent>
        </Card>

        {/* Change Summary */}
        {newDate && newTimeSlot && (
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">
                Proposed Change
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700 dark:text-blue-300">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>From:</span>
                  <span>{booking.date} • {getTimeLabel(booking.timeSlot)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>To:</span>
                  <span data-testid="proposed-change">
                    {format(newDate, "PPP")} • {getTimeLabel(newTimeSlot)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response Timeline */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground">
              <p className="font-medium mb-1">Response Timeline</p>
              <p>The professional will be notified and has 24 hours to respond to your request.</p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="w-full"
          size="lg"
          data-testid="button-send-request"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {isSubmitting ? "Sending Request..." : "Send Time Change Request"}
        </Button>

        {!canSubmit && !hasConflict() && (
          <p className="text-sm text-muted-foreground text-center">
            Please fill in all required fields
          </p>
        )}
      </div>
    </div>
  );
}