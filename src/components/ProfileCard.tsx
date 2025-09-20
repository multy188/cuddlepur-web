import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Shield, Clock, MapPin, Heart } from "lucide-react";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  distance?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  profileImage: string;
  isOnline: boolean;
  lastSeen?: string;
  isVerified: boolean;
  specialties: string[];
  onViewProfile: (id: string) => void;
  onBookSession: (id: string) => void;
  onLike?: (id: string) => void;
}

export default function ProfileCard({
  id,
  name,
  age,
  location,
  distance,
  rating,
  reviewCount,
  hourlyRate,
  bio,
  profileImage,
  isOnline,
  lastSeen,
  isVerified,
  specialties,
  onViewProfile,
  onBookSession,
  onLike
}: ProfileCardProps) {
  return (
    <Card className="p-4 hover-elevate">
      <div className="flex gap-4">
        {/* Profile Image with Online Status */}
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-status-online border-2 border-background rounded-full" />
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg" data-testid={`text-name-${id}`}>{name}, {age}</h3>
                {isVerified && (
                  <Shield className="h-4 w-4 text-chart-1" data-testid={`badge-verified-${id}`} />
                )}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{location}</span>
                {distance && <span className="ml-2">• {distance}</span>}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" />
                  <span className="font-medium">{rating}</span>
                  <span className="text-muted-foreground ml-1">({reviewCount})</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {isOnline ? "Online now" : lastSeen}
                </div>
              </div>
            </div>
            
            {onLike && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(id)}
                data-testid={`button-like-${id}`}
              >
                <Heart className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{bio}</p>

          {/* Specialties */}
          {specialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {specialties.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{specialties.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Actions and Rate */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-primary">
              ${hourlyRate}/hr
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(id)}
                data-testid={`button-view-profile-${id}`}
              >
                View Profile
              </Button>
              <Button
                size="sm"
                onClick={() => onBookSession(id)}
                data-testid={`button-book-session-${id}`}
              >
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}