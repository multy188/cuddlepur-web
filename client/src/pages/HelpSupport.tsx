import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Bug, Lightbulb, FileText, ChevronRight } from "lucide-react";
import { useState } from "react";

interface HelpSupportProps {
  onBack: () => void;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [reportForm, setReportForm] = useState({
    type: '',
    subject: '',
    description: ''
  });

  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { q: 'How do I create an account?', a: 'Tap "Get Started" on the welcome screen and follow the verification process.' },
        { q: 'What verification is required?', a: 'You need to verify your phone number, provide basic information, and upload a government-issued ID.' },
        { q: 'How long does verification take?', a: 'Most verifications are completed within 24 hours.' }
      ]
    },
    {
      id: 'booking-sessions',
      title: 'Booking Sessions',
      items: [
        { q: 'How do I book a session?', a: 'Browse professionals, select one you like, choose a time, and complete payment.' },
        { q: 'Can I cancel a booking?', a: 'Yes, you can cancel up to 24 hours before the session for a full refund.' },
        { q: 'What if the professional cancels?', a: 'You will receive a full refund immediately if they cancel.' }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      items: [
        { q: 'What payment methods are accepted?', a: 'We accept cards, mobile money (MTN, Vodafone), and bank transfers.' },
        { q: 'When is payment charged?', a: 'Payment is only charged when your session begins.' },
        { q: 'How do refunds work?', a: 'Refunds are processed within 3-5 business days to your original payment method.' }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      items: [
        { q: 'How are professionals verified?', a: 'All professionals undergo ID verification, background checks, and reference verification.' },
        { q: 'What if I feel unsafe?', a: 'You can report issues immediately through the app and contact emergency services if needed.' },
        { q: 'Can I block someone?', a: 'Yes, you can block any user through their profile or chat interface.' }
      ]
    }
  ];

  const handleSubmitReport = () => {
    console.log('Submitting report:', reportForm);
    // Reset form
    setReportForm({ type: '', subject: '', description: '' });
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
            <h1 className="text-lg font-semibold">Help & Support</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Quick Help
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              data-testid="button-live-chat"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              data-testid="button-email-support"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqSections.map((section) => (
              <div key={section.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto"
                  onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                  data-testid={`button-faq-${section.id}`}
                >
                  <span className="font-medium">{section.title}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${selectedSection === section.id ? 'rotate-90' : ''}`} />
                </Button>
                
                {selectedSection === section.id && (
                  <div className="mt-3 space-y-3 pl-4">
                    {section.items.map((item, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4">
                        <h4 className="font-medium text-sm mb-1">{item.q}</h4>
                        <p className="text-sm text-muted-foreground">{item.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Report Issue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-red-600" />
              Report a Bug or Issue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Issue Type</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={reportForm.type}
                onChange={(e) => setReportForm(prev => ({ ...prev, type: e.target.value }))}
                data-testid="select-issue-type"
              >
                <option value="">Select issue type</option>
                <option value="bug">Bug Report</option>
                <option value="payment">Payment Issue</option>
                <option value="verification">Verification Problem</option>
                <option value="booking">Booking Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Brief description of the issue"
                value={reportForm.subject}
                onChange={(e) => setReportForm(prev => ({ ...prev, subject: e.target.value }))}
                data-testid="input-issue-subject"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Please provide details about what happened, when it occurred, and any steps to reproduce the issue..."
                value={reportForm.description}
                onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
                data-testid="textarea-issue-description"
              />
            </div>
            
            <Button 
              onClick={handleSubmitReport}
              className="w-full"
              disabled={!reportForm.type || !reportForm.subject || !reportForm.description}
              data-testid="button-submit-issue"
            >
              <Bug className="h-4 w-4 mr-2" />
              Submit Issue Report
            </Button>
          </CardContent>
        </Card>

        {/* Feature Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Feature Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Have an idea to improve our platform? We'd love to hear your suggestions!
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              data-testid="button-feature-request"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Submit Feature Request
            </Button>
          </CardContent>
        </Card>

        {/* Community Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-600" />
              Community Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Learn about our community standards and platform rules.
            </p>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              data-testid="button-view-guidelines"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Community Guidelines
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">Support Email:</p>
              <p className="text-muted-foreground">support@cuddlepur.com</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Response Time:</p>
              <p className="text-muted-foreground">Within 24 hours on business days</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Phone Support:</p>
              <p className="text-muted-foreground">Available 9 AM - 6 PM, Monday - Friday</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}