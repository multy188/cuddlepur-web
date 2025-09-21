import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Upload, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function IdVerificationForm() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    frontImage: null as File | null
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frontPreview, setFrontPreview] = useState<string>('');

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFrontPreview(e.target?.result as string);
        setFormData(prev => ({ ...prev, frontImage: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.frontImage) {
      setError('ID image is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('idImage', formData.frontImage);

      const response = await fetch('http://localhost:3001/api/auth/verify-id', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('cuddlepur_token')}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit ID verification');
      }

      // Navigate to dashboard after ID verification submission
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to submit ID verification');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <CardTitle>Verify Your Identity</CardTitle>
        <CardDescription>
          Upload a photo of your government-issued ID to verify your identity. This helps keep our community safe.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}


          <div className="space-y-2">
            <Label>Government-Issued ID</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative">
              {frontPreview ? (
                <div className="relative">
                  <img src={frontPreview} alt="Government ID" className="max-h-48 mx-auto rounded" />
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Upload your ID</p>
                  <p className="text-sm text-gray-600">Drag and drop or click to select</p>
                  <p className="text-xs text-gray-500 mt-2">Accepts: Driver's License, Passport, National ID</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your ID information is encrypted and stored securely. We only use this to verify your identity and will never share it with third parties.
            </AlertDescription>
          </Alert>
        </CardContent>

        <div className="px-6 pb-6 space-y-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting for Review...
              </>
            ) : (
              'Submit for Verification'
            )}
          </Button>

          
          <p className="text-xs text-center text-muted-foreground">
            Verification typically takes 1-2 business days. You can still use the app while your ID is being reviewed.
          </p>
        </div>
      </form>
    </Card>
  );
}