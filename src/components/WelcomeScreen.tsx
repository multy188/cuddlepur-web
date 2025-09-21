import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, MapPin, CheckCircle, UserPlus, Search, MessageCircle, Heart, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/hero_1758369362163.jpeg";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  onGoToApp?: () => void;
}

export default function WelcomeScreen({ onGetStarted, onSignIn, onNavigate, isAuthenticated = false, onGoToApp }: WelcomeScreenProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", action: () => {} },
    { label: "How it works", action: () => onNavigate("how-it-works") },
    { label: "FAQ", action: () => onNavigate("faq") }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">CuddlePur</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-foreground hover:text-primary transition-colors"
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors w-full text-left"
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Desktop Layout - Side by side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
            {/* Left side - Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Find Your Perfect
                  <span className="text-primary block">Cuddle Companion</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experience the warmth of human connection through safe, professional platonic companionship. 
                  Our verified cuddlers provide comfort, conversation, and genuine care in a secure environment.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6"
                    onClick={onGoToApp}
                    data-testid="hero-go-to-app"
                  >
                    Go to App
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="text-lg px-8 py-6"
                      onClick={onGetStarted}
                      data-testid="hero-get-started"
                    >
                      Start Your Journey
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-lg px-8 py-6"
                      onClick={onSignIn}
                      data-testid="hero-sign-in"
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full border-2 border-background"></div>
                    <div className="w-8 h-8 bg-chart-1/20 rounded-full border-2 border-background"></div>
                    <div className="w-8 h-8 bg-chart-2/20 rounded-full border-2 border-background"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5,000+ verified professionals</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-1">4.8/5 rating</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Black couple embracing in a warm hug while wearing comfortable clothes" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-background border shadow-lg rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-sm">100% Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Text over image */}
          <div className="lg:hidden relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
              <img 
                src={heroImage} 
                alt="Black couple embracing in a warm hug while wearing comfortable clothes" 
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              
              {/* Text Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-start p-6">
                <div className="space-y-4 max-w-md">
                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
                    Find Your Perfect
                    <span className="text-primary block">Cuddle Companion</span>
                  </h1>
                  <p className="text-base text-white/90 leading-relaxed">
                    Experience the warmth of human connection through safe, professional platonic companionship.
                  </p>
                  
                  <div className="flex flex-col gap-3 pt-2">
                    {isAuthenticated ? (
                      <Button 
                        size="lg" 
                        className="text-base px-6 py-5"
                        onClick={onGoToApp}
                        data-testid="hero-go-to-app-mobile"
                      >
                        Go to App
                      </Button>
                    ) : (
                      <>
                        <Button 
                          size="lg" 
                          className="text-base px-6 py-5"
                          onClick={onGetStarted}
                          data-testid="hero-get-started-mobile"
                        >
                          Start Your Journey
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="text-base px-6 py-5 bg-white/10 border-white/30 text-white hover:bg-white/20"
                          onClick={onSignIn}
                          data-testid="hero-sign-in-mobile"
                        >
                          Sign In
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Enhanced with diagrams */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <div className="hidden md:block absolute top-8 -right-8 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-muted-foreground">Create your profile and complete verification</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-chart-1/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-chart-1" />
                </div>
                <div className="hidden md:block absolute top-8 -right-8 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Browse</h3>
              <p className="text-sm text-muted-foreground">Find verified professionals in your area</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-chart-2" />
                </div>
                <div className="hidden md:block absolute top-8 -right-8 transform translate-x-full">
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <p className="text-sm text-muted-foreground">Message and book a session safely</p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-chart-3/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-chart-3" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Enjoy</h3>
              <p className="text-sm text-muted-foreground">Experience safe, professional companionship</p>
            </div>
          </div>
          
          {/* Process Flow Diagram */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                Profile Setup
              </span>
              <ArrowRight className="h-4 w-4" />
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                Search & Match
              </span>
              <ArrowRight className="h-4 w-4" />
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                Safe Communication
              </span>
              <ArrowRight className="h-4 w-4" />
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                Professional Session
              </span>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center hover-elevate">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Verified Professionals</h3>
            <p className="text-sm text-muted-foreground">All cuddlers are background-checked and verified</p>
          </Card>
          
          <Card className="p-6 text-center hover-elevate">
            <CheckCircle className="h-12 w-12 text-chart-1 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Safe Environment</h3>
            <p className="text-sm text-muted-foreground">Strict safety guidelines and 24/7 support</p>
          </Card>
          
          <Card className="p-6 text-center hover-elevate">
            <Users className="h-12 w-12 text-chart-2 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Local Community</h3>
            <p className="text-sm text-muted-foreground">Connect with trusted people in your area</p>
          </Card>
        </div>


        {/* Services Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover-elevate">
              <h3 className="font-semibold mb-3">Platonic Cuddling</h3>
              <p className="text-sm text-muted-foreground mb-4">Professional, non-romantic physical comfort and companionship</p>
              <Badge variant="secondary" className="text-xs">From $45/hour</Badge>
            </Card>
            
            <Card className="p-6 hover-elevate">
              <h3 className="font-semibold mb-3">Movie Watching</h3>
              <p className="text-sm text-muted-foreground mb-4">Enjoy movies together in a comfortable, safe environment</p>
              <Badge variant="secondary" className="text-xs">From $40/hour</Badge>
            </Card>
            
            <Card className="p-6 hover-elevate">
              <h3 className="font-semibold mb-3">Conversation Companion</h3>
              <p className="text-sm text-muted-foreground mb-4">Quality conversation and emotional support from caring professionals</p>
              <Badge variant="secondary" className="text-xs">From $35/hour</Badge>
            </Card>
            
            <Card className="p-6 hover-elevate">
              <h3 className="font-semibold mb-3">Event Companion</h3>
              <p className="text-sm text-muted-foreground mb-4">Professional accompaniment to social events and gatherings</p>
              <Badge variant="secondary" className="text-xs">From $60/hour</Badge>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">5,000+</div>
              <p className="text-sm text-muted-foreground">Verified Professionals</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">25,000+</div>
              <p className="text-sm text-muted-foreground">Safe Sessions</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">4.8/5</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">50+</div>
              <p className="text-sm text-muted-foreground">Cities Available</p>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <p className="text-sm mb-4">"Finally found a safe way to get the comfort I needed. The verification process made me feel secure."</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Sarah M.</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <p className="text-sm mb-4">"The platform helped me build my professional cuddling practice safely and effectively."</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Michael R.</p>
                  <p className="text-xs text-muted-foreground">Professional</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <p className="text-sm mb-4">"Great way to meet genuine people looking for platonic companionship. Highly recommend!"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Emma K.</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 max-w-md mx-auto">
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="w-full"
              onClick={onGoToApp}
              data-testid="button-go-to-app"
            >
              Go to App
            </Button>
          ) : (
            <>
              <Button 
                size="lg" 
                className="w-full"
                onClick={onGetStarted}
                data-testid="button-get-started"
              >
                Get Started
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={onSignIn}
                data-testid="button-sign-in"
              >
                Sign In
              </Button>
            </>
          )}
          
          <div className="flex items-center justify-center mt-6">
            <Badge variant="secondary" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              Ages 18+ only
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <button 
              className="text-primary underline hover:text-primary/80" 
              onClick={() => onNavigate("terms")}
              data-testid="link-terms"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button 
              className="text-primary underline hover:text-primary/80" 
              onClick={() => onNavigate("privacy")}
              data-testid="link-privacy"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}