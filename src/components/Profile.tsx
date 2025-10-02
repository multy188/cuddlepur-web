import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Camera,
  Shield,
  Edit3,
  MapPin,
  Phone,
  LogOut,
  CheckCircle,
  AlertCircle,
  Star,
  Briefcase,
  Badge as BadgeIcon,
  X,
  Upload,
  Check
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/useAuth";
import { useUserPhotos, useUploadPhotos, useDeletePhoto, useSetProfilePicture, UserPhoto } from "@/hooks/useApi";

interface ProfileProps {
  onSignOut: () => void;
  onBack?: () => void;
  initialEditMode?: boolean;
  onApplyProfessional?: () => void;
}

export default function Profile({ onSignOut, initialEditMode = false, onApplyProfessional }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  
  // Photo management hooks
  const { data: photos, isLoading: photosLoading, error: photosError } = useUserPhotos();
  const uploadPhotos = useUploadPhotos();
  const deletePhoto = useDeletePhoto();
  const setProfilePicture = useSetProfilePicture();
  
  console.log('📸 Photos state:', { photos, photosLoading, photosError });
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    gender: user?.gender || '',
    hourlyRate: user?.hourlyRate || '',
    services: user?.services || [],
    experience: user?.experience || '',
    preferences: user?.preferences || {}
  });

  const handleSave = async () => {
    try {
      // Clean the form data before sending
      const cleanFormData: any = {};
      
      // Only include non-empty strings
      if (formData.firstName?.trim()) cleanFormData.firstName = formData.firstName.trim();
      if (formData.lastName?.trim()) cleanFormData.lastName = formData.lastName.trim();
      if (formData.bio?.trim()) cleanFormData.bio = formData.bio.trim();
      if (formData.city?.trim()) cleanFormData.city = formData.city.trim();
      if (formData.state?.trim()) cleanFormData.state = formData.state.trim();
      if (formData.country?.trim()) cleanFormData.country = formData.country.trim();
      if (formData.experience?.trim()) cleanFormData.experience = formData.experience.trim();
      
      // Handle date of birth - convert to ISO string if provided
      if (formData.dateOfBirth) {
        cleanFormData.dateOfBirth = new Date(formData.dateOfBirth).toISOString();
      }
      
      // Handle hourly rate - only include if positive number
      if (formData.hourlyRate && Number(formData.hourlyRate) > 0) {
        cleanFormData.hourlyRate = Number(formData.hourlyRate);
      }
      
      // Handle arrays
      if (formData.services && formData.services.length > 0) {
        cleanFormData.services = formData.services;
      }
      
      // Handle preferences object
      if (formData.preferences && Object.keys(formData.preferences).length > 0) {
        cleanFormData.preferences = formData.preferences;
      }
      
      await updateProfile.mutateAsync(cleanFormData);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Failed to update profile:', error);
    }
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
  const isProfessional = user.userType === 'PROFESSIONAL';

  // Get the current profile picture URL
  const profilePictureUrl = user.photos?.find(p => p.isProfilePicture)?.url || user.profilePicture || '';

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl pb-24">
      {/* Profile Header */}
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
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={() => console.log('Photo upload coming soon')}
                  data-testid="button-edit-photo"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <h2 className="text-2xl font-bold" data-testid="text-profile-name">
                  {fullName}
                </h2>
                {user.isVerified && (
                  <Badge variant="secondary" className="gap-1" data-testid="badge-verified">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
                {isProfessional && (
                  <Badge className="gap-1" data-testid="badge-professional">
                    <Star className="w-3 h-3" />
                    Professional
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground justify-center sm:justify-start mt-1">
                <MapPin className="w-4 h-4" />
                <span data-testid="text-location">{user.city || 'Location not set'}</span>
              </div>
              {isProfessional && user.hourlyRate && (
                <div className="flex items-center gap-2 justify-center sm:justify-start mt-2">
                  <span className="font-semibold">${user.hourlyRate}/hour</span>
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
                {!isProfessional && !isEditing && (
                  <Button
                    variant="outline"
                    data-testid="button-apply-professional"
                    onClick={onApplyProfessional}
                  >
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
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Photo Gallery
            </div>
            {isEditing && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      const formData = new FormData();
                      Array.from(e.target.files).forEach((file) => {
                        formData.append('photos', file);
                      });
                      uploadPhotos.mutate(formData);
                    }
                  }}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploadPhotos.isPending}
                />
                <label htmlFor="photo-upload">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    disabled={uploadPhotos.isPending || (photos?.length || 0) >= 10}
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Add Photos
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photosLoading ? (
            <div className="text-center py-8">Loading photos...</div>
          ) : photos && photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo: UserPhoto) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt="User photo"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {photo.isProfilePicture && (
                    <Badge 
                      className="absolute top-2 left-2"
                      variant="secondary"
                    >
                      Profile
                    </Badge>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      {!photo.isProfilePicture && (
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => setProfilePicture.mutate(photo.id)}
                          disabled={setProfilePicture.isPending}
                          title="Set as profile picture"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => deletePhoto.mutate(photo.id)}
                        disabled={deletePhoto.isPending}
                        title="Delete photo"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No photos uploaded yet</p>
              {isEditing && (
                <label htmlFor="photo-upload">
                  <Button variant="outline" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Your First Photo
                    </span>
                  </Button>
                </label>
              )}
            </div>
          )}
          {photos && photos.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              {photos.length}/10 photos uploaded
            </p>
          )}
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
                value={isEditing ? formData.bio : (user.bio || 'No bio added yet')}
                disabled={!isEditing}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell others about yourself..."
                rows={4}
                maxLength={500}
                data-testid="textarea-bio"
              />
              {isEditing && (
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.bio.length}/500 characters
                </p>
              )}
            </div>


            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type={isEditing ? "date" : "text"}
                value={isEditing ? formData.dateOfBirth : (user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided')}
                disabled={!isEditing}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                data-testid="input-date-of-birth"
              />
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                value={user.gender || 'Not specified'}
                disabled
                data-testid="input-gender"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={user.phoneNumber}
                disabled
                data-testid="input-phone-number"
              />
            </div>

          </CardContent>
        </Card>

        {/* Services (for professionals) */}
        {isProfessional && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Services Offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {user.services && user.services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.services.map((service, index) => (
                      <Badge key={index} variant="outline" data-testid={`badge-service-${index}`}>
                        {service}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No services listed</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={isEditing ? formData.city : (user.city || 'Not provided')}
                disabled={!isEditing}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Your city"
                data-testid="input-city"
              />
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={isEditing ? formData.state : (user.state || 'Not provided')}
                disabled={!isEditing}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                placeholder="Your state"
                data-testid="input-state"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={isEditing ? formData.country : (user.country || 'Not provided')}
                disabled={!isEditing}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                placeholder="Your country"
                data-testid="input-country"
              />
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Professional Settings (if professional and editing) */}
      {isProfessional && isEditing && (
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
                value={formData.hourlyRate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value ? parseInt(e.target.value) : '' }))}
                placeholder="45"
                data-testid="input-hourly-rate"
                min="1"
              />
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
                <div className="text-4xl font-bold">0.0</div>
                <div className="flex items-center gap-1 justify-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-gray-300"
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">No reviews yet</div>
              </div>
              
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-4">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full w-0"></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">0</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Recent Reviews</h4>
              
              {/* This would be replaced with actual reviews from API */}
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-4">
                  Complete your first booking to start receiving reviews from clients!
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                  <h4 className="font-medium text-blue-900 mb-2">Tips for great reviews:</h4>
                  <ul className="text-sm text-blue-800 space-y-1 text-left">
                    <li>• Be punctual and professional</li>
                    <li>• Communicate clearly with clients</li>
                    <li>• Provide excellent service quality</li>
                    <li>• Follow safety guidelines</li>
                  </ul>
                </div>
              </div>

              {/* When reviews exist, they would appear here like this: */}
              {/* 
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.reviewer.profilePicture} alt={review.reviewer.name} />
                        <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.reviewer.name}</p>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              */}
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
              {user.isIdVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">Identity Verification</p>
                <p className="text-sm text-muted-foreground">
                  {user.isIdVerified ? 'Government ID confirmed' : 'ID verification pending'}
                </p>
              </div>
            </div>
            <Badge variant={user.isIdVerified ? "secondary" : "outline"} data-testid="badge-id-verified">
              {user.isIdVerified ? 'Verified' : 'Pending'}
            </Badge>
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