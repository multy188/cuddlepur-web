import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Camera, 
  Shield, 
  Edit3, 
  MapPin, 
  Calendar,
  Phone,
  LogOut,
  CheckCircle,
  AlertCircle,
  Star,
  Plus,
  X,
  Upload,
  Heart,
  Home,
  Clock,
  Briefcase,
  Eye,
  Users,
  Badge as BadgeIcon
} from "lucide-react";
import femaleProfile from "@assets/generated_images/Professional_profile_photo_f962fff8.png";

interface ProfileProps {
  onSignOut: () => void;
  onBack?: () => void;
  initialEditMode?: boolean;
}

export default function Profile({ onSignOut, onBack, initialEditMode = false }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [profileData, setProfileData] = useState({
    fullName: "Alex Johnson",
    email: "alex@example.com", 
    phone: "+233 24 123 4567",
    dateOfBirth: "1995-08-15",
    gender: "Prefer not to say",
    location: "Accra, Ghana",
    bio: "Looking for genuine connections and meaningful conversations. I enjoy outdoor activities, reading, and trying new cuisines.",
    interests: ["Reading", "Outdoor Activities", "Cooking", "Music"],
    job: "Marketing Specialist",
    height: "5'7\"",
    ethnicity: "Prefer not to say",
    smoking: "No",
    drinking: "Occasionally", 
    relationshipStatus: "Single",
    hostGuestPreference: "Both",
    isVerified: true,
    profileImages: [femaleProfile],
    hourlyRate: 45,
    availability: {
      morning: true,
      afternoon: false, 
      evening: true
    },
    isProfessional: false
  });

  const [notifications, setNotifications] = useState({
    messages: true,
    bookings: true,
    promotions: false,
    safetyAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    showAge: true,
    showLocation: true,
    allowMessages: true,
    visibleToAll: true
  });

  // Mock data for reviews
  const reviews = [
    {
      id: "1",
      reviewer: "Sarah M.",
      rating: 5,
      comment: "Alex was wonderful company! Very respectful and great conversation.",
      date: "2 weeks ago"
    },
    {
      id: "2", 
      reviewer: "John D.",
      rating: 4,
      comment: "Had a lovely afternoon exploring the city. Highly recommend!",
      date: "3 weeks ago"
    }
  ];

  const averageRating = 4.8;
  const totalReviews = 23;

  // Location suggestions for Ghanaian cities
  const locationSuggestions = [
    "Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Ashaiman", "Sunyani",
    "Cape Coast", "Obuasi", "Teshie", "Tema", "Madina", "Koforidua",
    "Wa", "Techiman", "Ho", "Nungua", "Lashibi", "Dome", "Gbawe", "Kasoa"
  ];

  // Available interests/hobbies
  const availableInterests = [
    "Reading", "Outdoor Activities", "Cooking", "Music", "Photography", "Art",
    "Sports", "Gaming", "Travel", "Dancing", "Fitness", "Movies", "Technology",
    "Fashion", "Meditation", "Volunteering", "Writing", "Languages"
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile data to backend
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset to original data
  };

  const addInterest = (interest: string) => {
    if (!profileData.interests.includes(interest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const addPhoto = () => {
    // TODO: Implement photo upload
    console.log('Adding photo');
  };

  const removePhoto = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      profileImages: prev.profileImages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileData.profileImages[0]} alt="Profile" />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={addPhoto}
                  data-testid="button-edit-photo"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h2 className="text-2xl font-bold" data-testid="text-profile-name">
                  {profileData.fullName}
                </h2>
                {profileData.isVerified && (
                  <Badge variant="secondary" className="gap-1" data-testid="badge-verified">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
                {profileData.isProfessional && (
                  <Badge className="gap-1" data-testid="badge-professional">
                    <Star className="w-3 h-3" />
                    Professional
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground justify-center sm:justify-start mt-1">
                <MapPin className="w-4 h-4" />
                <span data-testid="text-location">{profileData.location}</span>
              </div>
              {profileData.isProfessional && (
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{averageRating}</span>
                    <span className="text-muted-foreground">({totalReviews} reviews)</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-semibold">${profileData.hourlyRate}/hour</span>
                </div>
              )}
              <div className="flex gap-2 mt-4 justify-center sm:justify-start flex-wrap">
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                  data-testid="button-edit-profile"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
                {isEditing && (
                  <Button onClick={handleSave} data-testid="button-save-profile">
                    Save Changes
                  </Button>
                )}
                {!profileData.isProfessional && !isEditing && (
                  <Button variant="outline" data-testid="button-apply-professional">
                    <BadgeIcon className="w-4 h-4 mr-2" />
                    Apply to be a Professional
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Photos ({profileData.profileImages.length}/10)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {profileData.profileImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Profile ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                  data-testid={`image-profile-${index}`}
                />
                {isEditing && profileData.profileImages.length > 1 && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                    data-testid={`button-remove-photo-${index}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && profileData.profileImages.length < 10 && (
              <Button
                variant="outline"
                className="h-24 w-full border-dashed"
                onClick={addPhoto}
                data-testid="button-add-photo"
              >
                <Plus className="w-6 h-6" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* About You Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              About You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell others about yourself..."
                rows={4}
                maxLength={500}
                data-testid="textarea-bio"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {profileData.bio.length}/500 characters
              </p>
            </div>

            <div>
              <Label htmlFor="job">Job/Occupation</Label>
              <Input
                id="job"
                value={profileData.job}
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, job: e.target.value }))}
                placeholder="e.g. Marketing Specialist"
                data-testid="input-job"
              />
            </div>

            <div>
              <Label>Interests & Hobbies</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="gap-1" data-testid={`badge-interest-${index}`}>
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-1 hover:text-destructive"
                        data-testid={`button-remove-interest-${index}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="mt-3">
                  <Label>Add Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableInterests
                      .filter(interest => !profileData.interests.includes(interest))
                      .map((interest, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => addInterest(interest)}
                          data-testid={`button-add-interest-${interest.toLowerCase().replace(' ', '-')}`}
                        >
                          + {interest}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Appearance Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="height">Height</Label>
              {isEditing ? (
                <Select value={profileData.height} onValueChange={(value) => setProfileData(prev => ({ ...prev, height: value }))}>
                  <SelectTrigger data-testid="select-height">
                    <SelectValue placeholder="Select height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'4\'10"'}>4'10"</SelectItem>
                    <SelectItem value={'4\'11"'}>4'11"</SelectItem>
                    <SelectItem value={'5\'0"'}>5'0"</SelectItem>
                    <SelectItem value={'5\'1"'}>5'1"</SelectItem>
                    <SelectItem value={'5\'2"'}>5'2"</SelectItem>
                    <SelectItem value={'5\'3"'}>5'3"</SelectItem>
                    <SelectItem value={'5\'4"'}>5'4"</SelectItem>
                    <SelectItem value={'5\'5"'}>5'5"</SelectItem>
                    <SelectItem value={'5\'6"'}>5'6"</SelectItem>
                    <SelectItem value={'5\'7"'}>5'7"</SelectItem>
                    <SelectItem value={'5\'8"'}>5'8"</SelectItem>
                    <SelectItem value={'5\'9"'}>5'9"</SelectItem>
                    <SelectItem value={'5\'10"'}>5'10"</SelectItem>
                    <SelectItem value={'5\'11"'}>5'11"</SelectItem>
                    <SelectItem value={'6\'0"'}>6'0"</SelectItem>
                    <SelectItem value={'6\'1"'}>6'1"</SelectItem>
                    <SelectItem value={'6\'2"'}>6'2"</SelectItem>
                    <SelectItem value={'6\'3"'}>6'3"</SelectItem>
                    <SelectItem value={'6\'4"'}>6'4"</SelectItem>
                    <SelectItem value={'6\'5"'}>6'5"</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.height} disabled data-testid="input-height" />
              )}
            </div>

            <div>
              <Label htmlFor="ethnicity">Ethnicity</Label>
              {isEditing ? (
                <Select value={profileData.ethnicity} onValueChange={(value) => setProfileData(prev => ({ ...prev, ethnicity: value }))}>
                  <SelectTrigger data-testid="select-ethnicity">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="African">African</SelectItem>
                    <SelectItem value="European">European</SelectItem>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Mixed/Multiracial">Mixed/Multiracial</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.ethnicity} disabled data-testid="input-ethnicity" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="smoking">Smoking</Label>
              {isEditing ? (
                <Select value={profileData.smoking} onValueChange={(value) => setProfileData(prev => ({ ...prev, smoking: value }))}>
                  <SelectTrigger data-testid="select-smoking">
                    <SelectValue placeholder="Select smoking preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Occasionally">Occasionally</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.smoking} disabled data-testid="input-smoking" />
              )}
            </div>

            <div>
              <Label htmlFor="drinking">Drinking</Label>
              {isEditing ? (
                <Select value={profileData.drinking} onValueChange={(value) => setProfileData(prev => ({ ...prev, drinking: value }))}>
                  <SelectTrigger data-testid="select-drinking">
                    <SelectValue placeholder="Select drinking preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Occasionally">Occasionally</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.drinking} disabled data-testid="input-drinking" />
              )}
            </div>

            <div>
              <Label htmlFor="relationshipStatus">Relationship Status</Label>
              {isEditing ? (
                <Select value={profileData.relationshipStatus} onValueChange={(value) => setProfileData(prev => ({ ...prev, relationshipStatus: value }))}>
                  <SelectTrigger data-testid="select-relationship-status">
                    <SelectValue placeholder="Select relationship status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="In a relationship">In a relationship</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.relationshipStatus} disabled data-testid="input-relationship-status" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Primary Location</Label>
              {isEditing ? (
                <Select value={profileData.location} onValueChange={(value) => setProfileData(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger data-testid="select-location">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationSuggestions.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.location} disabled data-testid="input-location" />
              )}
            </div>

            <div>
              <Label htmlFor="hostGuestPreference">Host/Guest Preference</Label>
              {isEditing ? (
                <Select value={profileData.hostGuestPreference} onValueChange={(value) => setProfileData(prev => ({ ...prev, hostGuestPreference: value }))}>
                  <SelectTrigger data-testid="select-host-guest-preference">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Host">Host (I prefer hosting)</SelectItem>
                    <SelectItem value="Guest">Guest (I prefer visiting)</SelectItem>
                    <SelectItem value="Both">Both (I'm flexible)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={profileData.hostGuestPreference} disabled data-testid="input-host-guest-preference" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability (if editing) */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="morning"
                  checked={profileData.availability.morning}
                  onCheckedChange={(checked) => 
                    setProfileData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, morning: !!checked }
                    }))
                  }
                  data-testid="checkbox-morning"
                />
                <Label htmlFor="morning">Morning (6AM - 12PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="afternoon"
                  checked={profileData.availability.afternoon}
                  onCheckedChange={(checked) => 
                    setProfileData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, afternoon: !!checked }
                    }))
                  }
                  data-testid="checkbox-afternoon"
                />
                <Label htmlFor="afternoon">Afternoon (12PM - 6PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="evening"
                  checked={profileData.availability.evening}
                  onCheckedChange={(checked) => 
                    setProfileData(prev => ({
                      ...prev,
                      availability: { ...prev.availability, evening: !!checked }
                    }))
                  }
                  data-testid="checkbox-evening"
                />
                <Label htmlFor="evening">Evening (6PM - 12AM)</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Settings (if professional and editing) */}
      {profileData.isProfessional && isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={profileData.hourlyRate}
                onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || 0 }))}
                placeholder="45"
                data-testid="input-hourly-rate"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews & Ratings (if professional) */}
      {profileData.isProfessional && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Reviews & Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{averageRating}</div>
                <div className="flex items-center gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= averageRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
              </div>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
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
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Identity Verified</p>
                <p className="text-sm text-muted-foreground">Government ID confirmed</p>
              </div>
            </div>
            <Badge variant="secondary" data-testid="badge-id-verified">Verified</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">Phone number confirmed</p>
              </div>
            </div>
            <Badge variant="secondary" data-testid="badge-phone-verified">Verified</Badge>
          </div>
          
        </CardContent>
      </Card>

      {/* Sign Out */}
      <div className="flex justify-center">
        <Button
          variant="destructive"
          onClick={onSignOut}
          data-testid="button-sign-out"
          className="px-8"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}