import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  Clock, 
  MapPin, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  MessageCircle,
  Calendar,
  DollarSign,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBookingRequests } from '@mock/bookingRequests';

interface BookingRequestsProps {
  onBack: () => void;
  onViewUserProfile: (userId: string) => void;
}

interface BookingRequest {
  id: string;
  client: {
    id: string;
    name: string;
    avatar: string;
    age: number;
    rating: number;
    isVerified: boolean;
  };
  date: string;
  time: string;
  duration: number;
  location: string;
  hourlyRate: number;
  totalAmount: number;
  message: string;
  specialRequests: string[];
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  requestedAt: string;
  expiresAt: string;
}

export default function BookingRequests({ onBack, onViewUserProfile }: BookingRequestsProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [responseMessage, setResponseMessage] = useState('');

  // Use mock data from centralized location
  const bookingRequests = mockBookingRequests;

  const filteredRequests = bookingRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = bookingRequests.filter(r => r.status === 'pending').length;

  const handleSelectRequest = (requestId: string, checked: boolean) => {
    if (checked) {
      setSelectedRequests(prev => [...prev, requestId]);
    } else {
      setSelectedRequests(prev => prev.filter(id => id !== requestId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(filteredRequests.map(r => r.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleBatchAction = (action: 'accept' | 'decline') => {
    console.log(`${action} requests:`, selectedRequests);
    // In real app, make API call to update request statuses
    setSelectedRequests([]);
  };

  const handleResponseAction = (requestId: string, action: 'accept' | 'decline') => {
    console.log(`${action} request ${requestId} with message:`, responseMessage);
    // In real app, make API call to update request status
    setResponseMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isExpiringSoon = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilExpiry <= 24 && hoursUntilExpiry > 0;
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
            
            <div className="text-center">
              <h1 className="font-semibold">Booking Requests</h1>
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ml-2" data-testid="pending-count">
                  {pendingCount} pending
                </Badge>
              )}
            </div>
            
            <div /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-4xl">
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by client name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-40" data-testid="select-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>

            {selectedRequests.length > 0 && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBatchAction('decline')}
                  data-testid="button-batch-decline"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Decline ({selectedRequests.length})
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleBatchAction('accept')}
                  data-testid="button-batch-accept"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept ({selectedRequests.length})
                </Button>
              </div>
            )}
          </div>

          {/* Batch Selection */}
          {filteredRequests.length > 1 && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedRequests.length === filteredRequests.length}
                onCheckedChange={handleSelectAll}
                data-testid="checkbox-select-all"
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select all visible requests
              </label>
            </div>
          )}
        </div>

        {/* Request List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover-elevate">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedRequests.includes(request.id)}
                        onCheckedChange={(checked) => handleSelectRequest(request.id, !!checked)}
                        data-testid={`checkbox-${request.id}`}
                      />
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.client.avatar} alt={request.client.name} />
                        <AvatarFallback>{request.client.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold" data-testid={`client-name-${request.id}`}>
                            {request.client.name}, {request.client.age}
                          </span>
                          {request.client.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>{request.client.rating}</span>
                          <span>★</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={getStatusColor(request.status)}
                        data-testid={`status-${request.id}`}
                      >
                        {request.status}
                      </Badge>
                      {isExpiringSoon(request.expiresAt) && (
                        <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          Expires soon
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span data-testid={`date-${request.id}`}>
                          {new Date(request.date).toLocaleDateString()} • {request.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span data-testid={`location-${request.id}`}>{request.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{request.duration} hours</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span data-testid={`rate-${request.id}`}>
                          ${request.hourlyRate}/hour • Total: ${request.totalAmount}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Requested: {request.requestedAt}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Expires: {request.expiresAt}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <h4 className="font-medium mb-2">Client Message:</h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {request.message}
                    </p>
                  </div>

                  {/* Special Requests */}
                  {request.specialRequests.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Special Requests:</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.specialRequests.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewUserProfile(request.client.id)}
                        data-testid={`button-view-profile-${request.id}`}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            data-testid={`button-message-${request.id}`}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Message to {request.client.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Type your message here..."
                              value={responseMessage}
                              onChange={(e) => setResponseMessage(e.target.value)}
                              data-testid={`textarea-message-${request.id}`}
                            />
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => handleResponseAction(request.id, 'decline')}
                                variant="outline"
                                data-testid={`button-decline-with-message-${request.id}`}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Decline with Message
                              </Button>
                              <Button 
                                onClick={() => handleResponseAction(request.id, 'accept')}
                                data-testid={`button-accept-with-message-${request.id}`}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept with Message
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResponseAction(request.id, 'decline')}
                          data-testid={`button-quick-decline-${request.id}`}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleResponseAction(request.id, 'accept')}
                          data-testid={`button-quick-accept-${request.id}`}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  {searchQuery || filter !== 'all' 
                    ? 'No booking requests match your filters' 
                    : 'No booking requests yet'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}