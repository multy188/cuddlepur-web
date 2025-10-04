import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Upload, Camera } from "lucide-react";

export default function ApplyToPro() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    hourlyRate: "",
    mobileMoneyProvider: "",
    accountName: "",
    accountNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idDocument || !selfie) {
      toast({
        title: "Missing Documents",
        description: "Please upload both your ID document and selfie",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("idDocument", idDocument);
      formDataToSend.append("selfie", selfie);
      formDataToSend.append("hourlyRate", formData.hourlyRate);
      formDataToSend.append("mobileMoneyProvider", formData.mobileMoneyProvider);
      formDataToSend.append("accountName", formData.accountName);
      formDataToSend.append("accountNumber", formData.accountNumber);

      const response = await fetch("http://localhost:3001/api/professional/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("cuddlepur_token")}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "We'll review your application within 24-48 hours.",
        });
        setLocation("/dashboard");
      } else {
        throw new Error(data.error || "Failed to submit application");
      }
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const requirements = [
    "Be at least 18 years old",
    "Have a valid government-issued ID",
    "Commit to providing platonic cuddling services only",
    "Maintain professional boundaries at all times",
    "Be available for at least a few sessions per month",
  ];

  const benefits = [
    {
      title: "Fair earnings structure",
      description: "Unlike other platforms that charge 40%+ commission, we only take 12.5% per session. This means you earn 87.5% of every booking with complete transparency - no subscriptions, no surprise fees.",
    },
    {
      title: "Access to thousands of clients",
      description: "Connect with over 600,000 members actively seeking professional cuddlers across the region. Most professionals start getting booking requests within their first week of joining.",
    },
    {
      title: "Complete schedule flexibility",
      description: "Set your own availability and work whenever suits you best. There's no minimum hours requirement, and you're free to work with other platforms simultaneously.",
    },
    {
      title: "You control the experience",
      description: "Clients contact you directly through our secure messaging system. You decide which sessions to accept and can build lasting connections with clients you trust and enjoy working with.",
    },
    {
      title: "Set your own rates",
      description: "You have full control over your pricing and session locations. While ₵500/hour is typical in the market, you're free to adjust your rates based on your experience and preferences.",
    },
  ];

  const howItWorks = [
    "Members search for cuddlers near them on our platform",
    "We promote your services to them as a safer, more reliable option",
    "They message you directly to organize a session",
    "You can chat first before deciding to accept",
    "After they pay, the money is held in escrow",
    "When you meet and scan their booking code, the session begins",
    "Payment is released to you 12 hours after the session starts",
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Become a Professional Cuddler</h1>
          <p className="text-lg text-muted-foreground">Join our platform and start earning while providing comfort</p>
        </div>

        {/* Requirements and Application Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Requirements */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Requirements</h2>
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Important Notice</p>
              <p className="text-sm text-red-800">
                All services must be strictly platonic. Any sexual conduct will result in immediate account suspension.
              </p>
              <p className="text-sm text-red-800">
                Both clients and professionals will be reviewed after each session to ensure platform safety and compliance.
              </p>
            </div>
          </Card>

          {/* Application Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ID Document Upload */}
              <div className="space-y-2">
                <Label htmlFor="idDocument">National ID Card *</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="idDocument"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                    required
                  />
                  {idDocument && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                </div>
                <p className="text-xs text-muted-foreground">Upload a clear photo of your National ID card (image only)</p>
              </div>

              {/* Selfie Upload - Camera Only */}
              <div className="space-y-2">
                <Label htmlFor="selfie">Live Selfie Photo *</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('selfie-input')?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {selfie ? "Retake Live Selfie" : "Take Live Selfie"}
                  </Button>
                  {selfie && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                </div>
                <Input
                  id="selfie-input"
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={(e) => setSelfie(e.target.files?.[0] || null)}
                  required
                />
                <p className="text-xs text-muted-foreground text-amber-700">
                  ⚠️ You must take a live photo using your camera to verify your identity
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Your Hourly Rate (₵) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder="e.g., 500"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Market rate is around ₵500/hour. You can change this later in your profile.
                </p>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="provider">Mobile Money Provider *</Label>
                  <Select
                    value={formData.mobileMoneyProvider}
                    onValueChange={(value) => setFormData({ ...formData, mobileMoneyProvider: value })}
                    required
                  >
                    <SelectTrigger id="provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MTN">MTN Mobile Money</SelectItem>
                      <SelectItem value="VODAFONE">Vodafone Cash</SelectItem>
                      <SelectItem value="AIRTELTIGO">AirtelTigo Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name *</Label>
                  <Input
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="Full name on account"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Mobile Money Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="0XXXXXXXXX"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Card>
        </div>

        {/* Benefits Section with Large Earn Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center justify-center">
            <img
              src="/assets/earn.svg"
              alt="Earn money"
              className="w-full max-w-md"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Become a Pro?</h2>
            {benefits.map((benefit, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-6">How Does It Work?</h2>
          <ol className="space-y-4">
            {howItWorks.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-semibold">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Payment Security</p>
            <p className="text-sm text-yellow-800">
              All payments are held in escrow until the session begins. This protects both you and the client.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
