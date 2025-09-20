import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TimePicker from "@/components/TimePicker";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon,
  DollarSign,
  User,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";

interface ProfessionalData {
  id: string;
  name: string;
  age: number;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  profileImage: string;
  isVerified: boolean;
}

interface BookingRequestProps {
  professional: ProfessionalData;
  onBack: () => void;
  onSubmitRequest: (bookingData: any) => void;
}

export default function BookingRequest({ professional, onBack, onSubmitRequest }: BookingRequestProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("14:00");
  const [duration, setDuration] = useState("2");
  const [locationType, setLocationType] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
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

  const durationOptions = [
    { value: "1", label: "1 hour" },
    { value: "2", label: "2 hours" },
    { value: "3", label: "3 hours" },
    { value: "4", label: "4 hours" }
  ];

  const locationTypes = [
    { value: "your_place", label: "Your Place", description: "Professional comes to your location" },
    { value: "their_place", label: "Their Place", description: "You visit professional's location" },
    { value: "public_venue", label: "Public Venue", description: "Meet at a public location" }
  ];

  const calculateTotal = () => {
    const hours = parseInt(duration);
    const subtotal = professional.hourlyRate * hours;
    const platformFee = Math.round(subtotal * 0.1); // 10% platform fee
    const total = subtotal + platformFee;
    
    return {
      subtotal,
      platformFee,
      total,
      hours
    };
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTimeSlot || !locationType) {
      return;
    }

    setIsSubmitting(true);
    
    const bookingData = {
      professionalId: professional.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      duration: parseInt(duration),
      locationType,
      sessionNotes,
      totalAmount: calculateTotal().total
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmitRequest(bookingData);
    setIsSubmitting(false);
  };

  const canSubmit = selectedDate && selectedTimeSlot && locationType;
  const pricing = calculateTotal();

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
            
            <h1 className="font-semibold">Book Session</h1>
            
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Professional Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={professional.profileImage} alt={professional.name} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg" data-testid="professional-name">
                    {professional.name}, {professional.age}
                  </h3>
                  {professional.isVerified && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{professional.rating} ({professional.reviewCount})</span>
                  </div>
                </div>
                
                <div className="text-lg font-semibold text-primary mt-2">
                  ${professional.hourlyRate}/hour
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-date-picker"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Select Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimePicker
              value={selectedTimeSlot}
              onChange={setSelectedTimeSlot}
            />
          </CardContent>
        </Card>

        {/* Duration Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger data-testid="select-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Location Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={locationType} onValueChange={setLocationType}>
              {locationTypes.map((type) => (
                <div key={type.value} className="flex items-start space-x-2">
                  <RadioGroupItem 
                    value={type.value} 
                    id={type.value}
                    data-testid={`radio-location-${type.value}`}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={type.value} className="cursor-pointer font-medium">
                      {type.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>

          </CardContent>
        </Card>

        {/* Session Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Session Notes & Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Let the professional know what you're looking for in this session..."
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="min-h-[100px]"
              data-testid="textarea-session-notes"
            />
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Session ({pricing.hours} {pricing.hours === 1 ? 'hour' : 'hours'})</span>
              <span data-testid="cost-subtotal">${pricing.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Platform fee (10%)</span>
              <span data-testid="cost-platform-fee">${pricing.platformFee}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span data-testid="cost-total">${pricing.total}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Payment will be requested after the professional accepts your booking
            </p>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="w-full"
              size="lg"
              data-testid="button-send-request"
            >
              {isSubmitting ? "Sending Request..." : "Send Booking Request"}
            </Button>
            {!canSubmit && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Please complete all required fields
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}