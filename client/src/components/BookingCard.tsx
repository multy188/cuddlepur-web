import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, MessageCircle, CreditCard, AlertCircle } from "lucide-react";

type BookingStatus = "requested" | "accepted" | "confirmed" | "completed" | "cancelled";

interface BookingCardProps {
  id: string;
  professionalName: string;
  professionalImage: string;
  status: BookingStatus;
  date: string;
  time: string;
  duration: number;
  location: string;
  amount: number;
  notes?: string;
  onViewDetails: (id: string) => void;
  onMessage: (id: string) => void;
  onPay?: (id: string) => void;
  onCancel: (id: string) => void;
}

const statusConfig = {
  requested: { 
    label: "Requested", 
    color: "bg-yellow-100 text-yellow-800", 
    icon: Clock 
  },
  accepted: { 
    label: "Payment Required", 
    color: "bg-blue-100 text-blue-800", 
    icon: CreditCard 
  },
  confirmed: { 
    label: "Confirmed", 
    color: "bg-green-100 text-green-800", 
    icon: Calendar 
  },
  completed: { 
    label: "Completed", 
    color: "bg-gray-100 text-gray-800", 
    icon: Calendar 
  },
  cancelled: { 
    label: "Cancelled", 
    color: "bg-red-100 text-red-800", 
    icon: AlertCircle 
  }
};

export default function BookingCard({
  id,
  professionalName,
  professionalImage,
  status,
  date,
  time,
  duration,
  location,
  amount,
  notes,
  onViewDetails,
  onMessage,
  onPay,
  onCancel
}: BookingCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className="p-4 hover-elevate">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={professionalImage} alt={professionalName} />
            <AvatarFallback>{professionalName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold" data-testid={`text-professional-${id}`}>
              {professionalName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {duration} hour{duration !== 1 ? 's' : ''} • ${amount}
            </p>
          </div>
        </div>

        <Badge className={config.color} data-testid={`badge-status-${id}`}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </div>

      {/* Booking Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{date} at {time}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="truncate">{location}</span>
        </div>
        
        {notes && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Notes:</span> {notes}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(id)}
          data-testid={`button-view-details-${id}`}
        >
          View Details
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMessage(id)}
          data-testid={`button-message-${id}`}
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          Message
        </Button>

        {status === "accepted" && onPay && (
          <Button
            size="sm"
            onClick={() => onPay(id)}
            data-testid={`button-pay-${id}`}
          >
            <CreditCard className="h-3 w-3 mr-1" />
            Pay Now
          </Button>
        )}

        {(status === "requested" || status === "accepted") && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancel(id)}
            data-testid={`button-cancel-${id}`}
          >
            Cancel
          </Button>
        )}
      </div>

      {/* Payment Warning for Accepted Bookings */}
      {status === "accepted" && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <CreditCard className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">Payment Required</p>
              <p className="text-blue-700 dark:text-blue-200">
                Complete payment to confirm your booking. Cancellation policy applies.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}