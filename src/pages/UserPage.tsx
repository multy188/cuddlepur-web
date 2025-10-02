import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Loader2,
  MoreVertical,
  Flag,
  Ban,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useApi";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = useUser(id || "");
  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
          <p className="text-lg text-muted-foreground mb-4">
            {error?.message || "User not found"}
          </p>
          <Button onClick={() => setLocation("/search")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const userData = data.user;
  const fullName =
    `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "User";
  const isProfessional = userData.userType === "PROFESSIONAL";
  const profilePictureUrl =
    userData.photos?.find((p) => p.url)?.url || userData.profilePicture || "";

  // Get all user photos for carousel
  const allPhotos = userData.photos && userData.photos.length > 0
    ? userData.photos.map((p) => p.url)
    : profilePictureUrl
    ? [profilePictureUrl]
    : [];

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  const openPhotoDialog = (index: number = 0) => {
    setCurrentPhotoIndex(index);
    setIsPhotoDialogOpen(true);
  };

  // Touch handling for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - next photo
      handleNextPhoto();
    }
    if (touchEndX - touchStartX > 50) {
      // Swipe right - previous photo
      handlePreviousPhoto();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6 max-w-6xl pb-24">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/search")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="border border-border bg-card p-3 rounded">
          {/* First Row: Profile Picture (1/3) + User Info (2/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {/* Profile Picture - Takes 1/3 on desktop */}
            <div className="md:col-span-1">
              <div
                className="aspect-square relative rounded-lg overflow-hidden border border-border cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openPhotoDialog(0)}
              >
                <img
                  src={profilePictureUrl || "/placeholder-avatar.png"}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Info - Takes 2/3 on desktop */}
            <div className="md:col-span-2 p-6 rounded-lg  space-y-4">
              {/* Name and Kebab Menu */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold">{fullName}</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => console.log('Report user')}>
                        <Flag className="w-4 h-4 mr-2" />
                        Report
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Block user')}>
                        <Ban className="w-4 h-4 mr-2" />
                        Block
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Badge className="gap-1">
                  {isProfessional ? "Professional Host" : "Guest"}
                </Badge>
              </div>

              {/* User Details - Single Line */}
              <div className="text-muted-foreground">
                <span>
                  {userData.age || "Age not set"} - {userData.gender || "Gender not set"} - {" "}
                  {userData.city && userData.state && userData.country
                    ? `${userData.city}, ${userData.state}, ${userData.country}`
                    : userData.city && userData.state
                    ? `${userData.city}, ${userData.state}`
                    : "Location not set"}
                </span>
              </div>

              {/* Additional Details Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {/* Reviews - Only for professionals */}
                {isProfessional && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">
                      {userData.averageRating.toFixed(1)} ({userData.totalReviews}{" "}
                      {userData.totalReviews === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                )}

                {/* Last Online */}
                <div className="text-sm text-muted-foreground">
                  Last online: {userData.lastSeenAt
                    ? new Date(userData.lastSeenAt).toLocaleDateString()
                    : "Recently"}
                </div>

                {/* Join Date */}
                <div className="text-sm text-muted-foreground">
                  Joined: {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Recently"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={() => {
                    console.log('🔔 Message button clicked, navigating to:', `/messages?userId=${id}`);
                    setLocation(`/messages?userId=${id}`);
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Message
                </Button>
                {isProfessional && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    size="lg"
                    onClick={() => setLocation(`/booking/request/${id}`)}
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Review Cuddler
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-border mt-4"></div>

          {/* Tabs: About and Reviews */}
          <Tabs defaultValue="about" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* About Tab Content */}
            <TabsContent value="about" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bio / What Friends Say */}
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                    <User className="w-5 h-5" />
                    {isProfessional ? "About" : "What Friends Say"}
                  </h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {userData.bio || "No bio available yet."}
                    </p>

                    {/* Services for professionals */}
                    {isProfessional &&
                      userData.services &&
                      userData.services.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Services Offered</h4>
                          <div className="flex flex-wrap gap-2">
                            {userData.services.map((service, index) => (
                              <Badge key={index} variant="outline">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Hourly Rate for professionals */}
                    {isProfessional && userData.hourlyRate && (
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Hourly Rate</span>
                          <span className="text-2xl font-bold">${userData.hourlyRate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preferences */}
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                    <Shield className="w-5 h-5" />
                    Preferences & Details
                  </h3>
                  <div className="space-y-4">
                    {/* Gender */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Gender</span>
                      <span className="font-medium">{userData.gender || "Not specified"}</span>
                    </div>

                    {/* Cuddling Style */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Cuddling Style</span>
                      <span className="font-medium">
                        {userData.preferences?.cuddlingStyle || "Not specified"}
                      </span>
                    </div>

                    {/* Preferred Position */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Preferred Position</span>
                      <span className="font-medium">
                        {userData.preferences?.position || "Not specified"}
                      </span>
                    </div>

                    {/* Session Preference */}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Session Type</span>
                      <span className="font-medium">
                        {userData.preferences?.sessionType || "Not specified"}
                      </span>
                    </div>

                    {/* Interests */}
                    {userData.preferences?.interests && userData.preferences.interests.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {userData.preferences.interests.map((interest: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab Content */}
            <TabsContent value="reviews" className="mt-8">
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                  <Star className="w-5 h-5" />
                  Reviews & Ratings
                </h3>

                {isProfessional ? (
                  <>
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{userData.averageRating.toFixed(1)}</div>
                        <div className="flex items-center gap-1 justify-center mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= userData.averageRating
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {userData.totalReviews} {userData.totalReviews === 1 ? "review" : "reviews"}
                        </div>
                      </div>
                    </div>

                    {userData.totalReviews === 0 ? (
                      <div className="text-center py-8">
                        <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">No reviews yet</h3>
                        <p className="text-muted-foreground">Be the first to review this professional!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-muted-foreground text-center">Reviews will be displayed here.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-muted-foreground">Reviews are only available for professional hosts.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Photo Gallery Dialog */}
        <Dialog open={isPhotoDialogOpen} onOpenChange={setIsPhotoDialogOpen}>
          <DialogContent className="max-w-4xl p-0 bg-black">
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-50 bg-black/70 hover:bg-black/90 text-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPhotoDialogOpen(false);
                }}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Main Image with Touch Support */}
              <div
                className="relative w-full"
                style={{ minHeight: '500px' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {allPhotos.length > 0 ? (
                  <img
                    src={allPhotos[currentPhotoIndex]}
                    alt={`${fullName} - Photo ${currentPhotoIndex + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain select-none"
                    draggable={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-white">No photos available</p>
                  </div>
                )}
              </div>

              {/* Navigation Arrows - Only show if more than one photo */}
              {allPhotos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-black/70 hover:bg-black/90 text-white rounded-full h-12 w-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviousPhoto();
                    }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-black/70 hover:bg-black/90 text-white rounded-full h-12 w-12"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextPhoto();
                    }}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>

                  {/* Photo Dots Navigation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {allPhotos.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
                          index === currentPhotoIndex
                            ? 'bg-white w-6'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPhotoIndex(index);
                        }}
                        aria-label={`Go to photo ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Photo Counter */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {currentPhotoIndex + 1} / {allPhotos.length}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
