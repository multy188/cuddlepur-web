import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Camera,
  Shield,
  MapPin,
  CheckCircle,
  AlertCircle,
  Star,
  Briefcase,
  MessageCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useUser } from "@/hooks/useApi";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = useUser(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !data?.success || !data.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">{error?.message || 'User not found'}</p>
          <Button onClick={() => setLocation('/search')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const userData = data.user;
  const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'User';
  const isProfessional = userData.userType === 'PROFESSIONAL';
  const profilePictureUrl = userData.photos?.find(p => p.url)?.url || userData.profilePicture || '';

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl pb-24">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => setLocation('/search')}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* User Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profilePictureUrl} alt="Profile" />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h2 className="text-2xl font-bold">{fullName}</h2>
                {userData.isVerified && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
                {isProfessional && (
                  <Badge className="gap-1">
                    <Star className="w-3 h-3" />
                    Professional
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-1 text-muted-foreground justify-center sm:justify-start mt-1">
                <MapPin className="w-4 h-4" />
                <span>{userData.city || 'Location not set'}</span>
              </div>

              {isProfessional && userData.hourlyRate && (
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                  <span className="font-semibold">${userData.hourlyRate}/hour</span>
                </div>
              )}

              <div className="flex gap-2 mt-4 justify-center sm:justify-start flex-wrap">
                <Button
                  variant="default"
                  onClick={() => {
                    console.log('🔔 Message button clicked, navigating to:', `/messages?userId=${id}`);
                    setLocation(`/messages?userId=${id}`);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                {isProfessional && (
                  <Button
                    variant="outline"
                    onClick={() => setLocation(`/booking/request/${id}`)}
                  >
                    Book Session
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      {userData.photos && userData.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData.photos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt="User photo"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* About */}
      {userData.bio && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{userData.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Services (for professionals) */}
      {isProfessional && userData.services && userData.services.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Services Offered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userData.services.map((service, index) => (
                <Badge key={index} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews & Ratings (if professional) */}
      {isProfessional && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Reviews & Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold">{userData.averageRating.toFixed(1)}</div>
                <div className="flex items-center gap-1 justify-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= userData.averageRating
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {userData.totalReviews} {userData.totalReviews === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>

            {userData.totalReviews === 0 && (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">No reviews yet</h3>
                <p className="text-muted-foreground">Be the first to review this professional!</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {userData.isVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">Identity Verification</p>
                <p className="text-sm text-muted-foreground">
                  {userData.isVerified ? 'Verified account' : 'Not verified'}
                </p>
              </div>
            </div>
            <Badge variant={userData.isVerified ? "secondary" : "outline"}>
              {userData.isVerified ? 'Verified' : 'Unverified'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
