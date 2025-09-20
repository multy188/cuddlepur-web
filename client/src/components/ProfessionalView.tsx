import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Star, 
  Shield, 
  Clock, 
  MapPin, 
  Heart,
  MessageCircle,
  MoreVertical,
  CheckCircle,
  User,
  Eye,
  Briefcase,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfessionalData {
  id: string;
  name: string;
  age: number;
  location: string;
  distance?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  profileImages: string[];
  isOnline: boolean;
  lastSeen?: string;
  isVerified: boolean;
  specialties: string[];
  height?: string;
  ethnicity?: string;
  job?: string;
  smoking?: string;
  drinking?: string;
  relationshipStatus?: string;
  availability: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
  reviews: Array<{
    id: string;
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

interface ProfessionalViewProps {
  professional: ProfessionalData;
  onBack: () => void;
  onBookSession: (id: string) => void;
}

export default function ProfessionalView({ professional, onBack, onBookSession }: ProfessionalViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const handleBookSession = () => {
    onBookSession(professional.id);
  };

  const formatLastSeen = () => {
    if (professional.isOnline) return "Online now";
    return professional.lastSeen || "Last seen recently";
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
            
            <h1 className="font-semibold truncate">{professional.name}</h1>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem data-testid="menu-report">
                  Report Profile
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-block">
                  Block User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6 max-w-4xl">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-shrink-0">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={professional.profileImages[0]} alt={professional.name} />
                  <AvatarFallback>
                    <User className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>
                {professional.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-bold" data-testid="professional-name">
                    {professional.name}, {professional.age}
                  </h2>
                  {professional.isVerified && (
                    <Badge variant="secondary" className="gap-1" data-testid="badge-verified">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span data-testid="location">{professional.location}</span>
                  {professional.distance && (
                    <span className="text-sm">• {professional.distance}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold" data-testid="rating">{professional.rating}</span>
                    <span className="text-muted-foreground">({professional.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span data-testid="last-seen">{formatLastSeen()}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-primary" data-testid="hourly-rate">
                  ${professional.hourlyRate}/hour
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery Carousel */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Carousel Photo */}
              <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                <DialogTrigger asChild>
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setIsImageDialogOpen(true)}
                    data-testid="main-photo"
                  >
                    <img
                      src={professional.profileImages[selectedImageIndex]}
                      alt={professional.name}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Carousel Navigation */}
                    {professional.profileImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(prev => 
                              prev > 0 ? prev - 1 : professional.profileImages.length - 1
                            );
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          data-testid="button-prev-photo"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(prev => 
                              prev < professional.profileImages.length - 1 ? prev + 1 : 0
                            );
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          data-testid="button-next-photo"
                        >
                          <ArrowLeft className="w-4 h-4 transform rotate-180" />
                        </button>
                      </>
                    )}
                    
                    {/* Photo counter */}
                    {professional.profileImages.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {selectedImageIndex + 1} / {professional.profileImages.length}
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img
                    src={professional.profileImages[selectedImageIndex]}
                    alt={professional.name}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </DialogContent>
              </Dialog>

              {/* Swipe indicators */}
              {professional.profileImages.length > 1 && (
                <div className="flex justify-center gap-2">
                  {professional.profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        selectedImageIndex === index ? 'bg-primary' : 'bg-muted'
                      }`}
                      data-testid={`indicator-${index}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* About & Specialties */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                About {professional.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed" data-testid="bio">
                {professional.bio}
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {professional.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" data-testid={`specialty-${index}`}>
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {professional.height && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span data-testid="height">{professional.height}</span>
                </div>
              )}
              {professional.ethnicity && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ethnicity:</span>
                  <span data-testid="ethnicity">{professional.ethnicity}</span>
                </div>
              )}
              {professional.job && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupation:</span>
                  <span data-testid="job">{professional.job}</span>
                </div>
              )}
              {professional.smoking && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Smoking:</span>
                  <span data-testid="smoking">{professional.smoking}</span>
                </div>
              )}
              {professional.drinking && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Drinking:</span>
                  <span data-testid="drinking">{professional.drinking}</span>
                </div>
              )}
              {professional.relationshipStatus && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Relationship:</span>
                  <span data-testid="relationship">{professional.relationshipStatus}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`w-4 h-4 rounded mx-auto mb-1 ${
                    professional.availability.morning ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm">Morning</span>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded mx-auto mb-1 ${
                    professional.availability.afternoon ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm">Afternoon</span>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded mx-auto mb-1 ${
                    professional.availability.evening ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm">Evening</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Reviews ({professional.reviewCount})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professional.reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.reviewer}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
                {professional.reviewCount > 3 && (
                  <Button variant="outline" className="w-full">
                    View All Reviews
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Session Button */}
        <div className="sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
          <Button
            onClick={handleBookSession}
            className="w-full"
            size="lg"
            data-testid="button-book-session"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Book Session - ${professional.hourlyRate}/hour
          </Button>
        </div>
      </div>
    </div>
  );
}