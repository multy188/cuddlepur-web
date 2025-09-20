import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Shield,
  CreditCard,
  Users,
  MessageCircle,
  HelpCircle,
  Heart
} from "lucide-react";
import { useState } from "react";

interface FAQProps {
  onBack: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "safety" | "payment" | "account" | "professional";
}

export default function FAQ({ onBack }: FAQProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqItems: FAQItem[] = [
    {
      id: "1",
      category: "general",
      question: "What is CuddlePur?",
      answer: "CuddlePur is a professional platform that connects people seeking platonic companionship with verified cuddlers. All interactions are strictly non-romantic and focus on providing comfort, conversation, and emotional support in a safe environment."
    },
    {
      id: "2", 
      category: "general",
      question: "Is cuddling really platonic?",
      answer: "Yes, absolutely. All cuddling sessions on CuddlePur are strictly platonic. Our professionals are trained to maintain appropriate boundaries, and any romantic or sexual behavior is strictly prohibited and will result in immediate account termination."
    },
    {
      id: "3",
      category: "safety",
      question: "How do you ensure user safety?",
      answer: "We take safety seriously with multiple measures: comprehensive background checks, ID verification, real-time monitoring of communications, 24/7 support, emergency contact systems, and strict community guidelines with zero tolerance for inappropriate behavior."
    },
    {
      id: "4",
      category: "safety", 
      question: "What should I do if I feel uncomfortable?",
      answer: "Trust your instincts. You can end any session immediately, contact our 24/7 support team, use our emergency contact feature, or report concerning behavior through the app. Your safety and comfort are our top priorities."
    },
    {
      id: "5",
      category: "payment",
      question: "How does payment work?",
      answer: "All payments are processed securely through our platform. Rates are set by individual professionals (typically $35-60/hour). Payment is held in escrow until after the session is completed successfully. We accept major credit cards and digital payment methods."
    },
    {
      id: "6",
      category: "payment",
      question: "What is your refund policy?",
      answer: "If a session is cancelled more than 24 hours in advance, you receive a full refund. For cancellations within 24 hours, a 50% refund applies. If a professional doesn't show up or behaves inappropriately, you receive a full refund plus credit."
    },
    {
      id: "7",
      category: "account",
      question: "How do I become a verified professional?",
      answer: "To become a professional cuddler, you must complete our verification process: submit government ID, pass a background check, provide references, complete our training program, and agree to our code of conduct. The process typically takes 3-5 business days."
    },
    {
      id: "8",
      category: "account",
      question: "Can I choose my cuddler?",
      answer: "Yes! You can browse profiles, read reviews, check availability, and message potential cuddlers before booking. Our search filters help you find professionals who match your preferences for location, gender, specialties, and more."
    },
    {
      id: "9",
      category: "professional",
      question: "What training do professionals receive?",
      answer: "All professionals complete mandatory training covering: appropriate boundaries, consent and communication, safety protocols, recognizing signs of distress, de-escalation techniques, and our platform policies. Ongoing education is required to maintain active status."
    },
    {
      id: "10",
      category: "professional",
      question: "Where do sessions take place?",
      answer: "Sessions can occur in various safe locations: your home, the professional's space (if they offer hosting), public places like cafes or parks, or neutral locations like libraries. First meetings should always be in public spaces."
    },
    {
      id: "11",
      category: "general",
      question: "What if I have social anxiety?",
      answer: "Many of our professionals specialize in supporting people with social anxiety. You can specify your needs when booking, start with shorter sessions, meet in comfortable public spaces, and communicate your boundaries clearly. Our professionals are trained to create welcoming, non-judgmental environments."
    },
    {
      id: "12",
      category: "general",
      question: "Is there an age requirement?",
      answer: "Yes, all users must be 18 years or older. Age verification is part of our mandatory verification process for both clients and professionals."
    }
  ];

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "general", label: "General", icon: Users },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "account", label: "Account", icon: MessageCircle },
    { id: "professional", label: "Professionals", icon: Heart }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredItems = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about CuddlePur, safety, and our services
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                  data-testid={`filter-${category.id}`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                data-testid={`faq-question-${item.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(c => c.id === item.category)?.label}
                    </Badge>
                    <h3 className="font-medium text-base">{item.question}</h3>
                  </div>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed pl-12">
                    {item.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to help you with any questions or concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" data-testid="button-contact-support">
                Contact Support
              </Button>
              <Button size="lg" data-testid="button-start-journey">
                Start Your Journey
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}