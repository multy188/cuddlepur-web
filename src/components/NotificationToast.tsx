import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  X, 
  Calendar, 
  DollarSign, 
  Shield, 
  Star, 
  AlertTriangle,
  CheckCircle,
  User
} from "lucide-react";

export interface Notification {
  id: string;
  type: 'booking_request' | 'booking_cancelled' | 'verification_approved' | 'booking_paid' | 'profile_reviewed' | 'booking_confirmed' | 'payment_received';
  title: string;
  message: string;
  userImage?: string;
  userName?: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationToastProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  maxVisible?: number;
}

export default function NotificationToast({ 
  notifications, 
  onDismiss, 
  onMarkAsRead, 
  maxVisible = 3 
}: NotificationToastProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  // Show only unread notifications, limited by maxVisible
  useEffect(() => {
    const unreadNotifications = notifications
      .filter(n => !n.isRead)
      .slice(0, maxVisible);
    setVisibleNotifications(unreadNotifications);
  }, [notifications, maxVisible]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_request':
        return <Calendar className="w-5 h-5 text-primary" />;
      case 'booking_cancelled':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'verification_approved':
        return <CheckCircle className="w-5 h-5 text-secondary" />;
      case 'booking_paid':
      case 'payment_received':
        return <DollarSign className="w-5 h-5 text-secondary" />;
      case 'profile_reviewed':
        return <Star className="w-5 h-5" style={{ color: 'hsl(var(--chart-4))' }} />;
      case 'booking_confirmed':
        return <Shield className="w-5 h-5 text-primary" />;
      default:
        return <User className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking_request':
      case 'booking_confirmed':
        return "border-l-primary bg-primary/5";
      case 'booking_cancelled':
        return "border-l-destructive bg-destructive/5";
      case 'verification_approved':
      case 'booking_paid':
      case 'payment_received':
        return "border-l-secondary bg-secondary/5";
      case 'profile_reviewed':
        return "border-l-[hsl(var(--chart-4))] bg-[hsl(var(--chart-4))]/5";
      default:
        return "border-l-muted bg-muted/5";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleNotificationClick = (notification: Notification) => {
    onMarkAsRead(notification.id);
  };

  const handleDismiss = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDismiss(id);
  };

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {visibleNotifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`
            cursor-pointer border-l-4 hover-elevate
            ${getNotificationColor(notification.type)}
          `}
          onClick={() => handleNotificationClick(notification)}
          data-testid={`notification-${notification.id}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-1" data-testid={`notification-title-${notification.id}`}>
                      {notification.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2" data-testid={`notification-message-${notification.id}`}>
                      {notification.message}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                    onClick={(e) => handleDismiss(e, notification.id)}
                    data-testid={`notification-dismiss-${notification.id}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  {notification.userImage && notification.userName && (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-5 h-5">
                        <AvatarImage src={notification.userImage} alt={notification.userName} />
                        <AvatarFallback className="text-xs">
                          {notification.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-foreground" data-testid={`notification-user-${notification.id}`}>
                        {notification.userName}
                      </span>
                    </div>
                  )}
                  
                  <span className="text-xs text-muted-foreground ml-auto" data-testid={`notification-time-${notification.id}`}>
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}