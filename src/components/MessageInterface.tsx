import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Calendar, MoreVertical, ImagePlus, ArrowLeft } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetImageUploadUrl, useUploadToS3 } from "@/hooks/useApi";

interface Message {
  id: string;
  text?: string;
  image?: string;
  timestamp: string;
  isOwn: boolean;
  isRead?: boolean;
  type: 'text' | 'image';
}

interface MessageInterfaceProps {
  contactName: string;
  contactImage: string;
  isOnline: boolean;
  isProfessional?: boolean;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onSendImage?: (imageUrl: string) => void;
  onBookSession?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
  onBack?: () => void;
  onContactClick?: () => void;
}

export default function MessageInterface({
  contactName,
  contactImage,
  isOnline,
  isProfessional = false,
  messages,
  onSendMessage,
  onSendImage,
  onBookSession,
  onReport,
  onBlock,
  onBack,
  onContactClick
}: MessageInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getUploadUrlMutation = useGetImageUploadUrl();
  const uploadToS3Mutation = useUploadToS3();
  const isUploading = getUploadUrlMutation.isPending || uploadToS3Mutation.isPending;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // If there's an image selected, upload it using presigned URL
      if (selectedImage && onSendImage) {
        // Step 1: Get presigned URL from server
        const { uploadURL, imageUrl } = await getUploadUrlMutation.mutateAsync();

        // Step 2: Upload file directly to S3
        await uploadToS3Mutation.mutateAsync({
          file: selectedImage,
          uploadURL
        });

        // Step 3: Send the final S3 URL in the message
        onSendImage(imageUrl);
      }

      // If there's a text message, send it
      if (newMessage.trim()) {
        onSendMessage(newMessage.trim());
      }

      // Clear inputs
      setNewMessage("");
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onSendImage) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back-to-conversations"
              aria-label="Back to conversations"
              title="Back to conversations"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div
            className={`relative ${onContactClick ? 'cursor-pointer' : ''}`}
            onClick={onContactClick}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={contactImage} alt={contactName} />
              <AvatarFallback>{contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-status-online border-2 border-background rounded-full" />
            )}
          </div>

          <div
            className={onContactClick ? 'cursor-pointer' : ''}
            onClick={onContactClick}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold" data-testid="text-contact-name">{contactName}</h3>
              {isProfessional && (
                <Badge className="bg-orange-600 text-white font-bold text-xs hidden md:inline-flex">
                  Pro
                </Badge>
              )}
              {isProfessional && (
                <Badge className="bg-orange-600 text-white font-bold text-xs md:hidden">
                  P
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isOnline ? "Online now" : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBookSession && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBookSession}
              data-testid="button-book-session"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Book
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="button-more-options">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onReport} data-testid="menu-item-report">
                Report User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onBlock} data-testid="menu-item-block">
                Block User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Booking Context Bar */}
      {false && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/20 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium text-blue-900 dark:text-blue-100">Active Booking</span>
              <span className="text-blue-700 dark:text-blue-200 ml-2">Tomorrow at 2:00 PM</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Confirmed
            </Badge>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                message.isOwn
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
              data-testid={`message-${message.id}`}
            >
              {message.type === 'image' && message.image ? (
                <div className="space-y-2">
                  <img
                    src={message.image}
                    alt="Shared image"
                    className="rounded-md max-w-full h-auto"
                    style={{ maxHeight: '200px' }}
                  />
                  <p className={`text-xs ${
                    message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-lg max-h-[150px] w-auto border-2 border-border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={removeImage}
            >
              ✕
            </Button>
          </div>
        )}

        <div className="flex gap-2 items-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || !!selectedImage}
            data-testid="button-upload-image"
            className="mb-1"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isUploading ? "Uploading image..." : "Type a message..."}
            className="flex-1 min-h-[80px] max-h-[200px] resize-none"
            disabled={isUploading}
            data-testid="input-message"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="sm"
            disabled={(!newMessage.trim() && !selectedImage) || isUploading}
            data-testid="button-send-message"
            className="mb-1"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          data-testid="input-image-upload"
        />
        
        <p className="text-xs text-muted-foreground mt-2">
          Keep conversations respectful and follow community guidelines
        </p>
      </form>
    </div>
  );
}