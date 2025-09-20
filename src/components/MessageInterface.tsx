import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Calendar, MoreVertical, ImagePlus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  messages: Message[];
  onSendMessage: (message: string) => void;
  onSendImage?: (imageUrl: string) => void;
  onBookSession?: () => void;
  onReport?: () => void;
  onBlock?: () => void;
}

export default function MessageInterface({
  contactName,
  contactImage,
  isOnline,
  messages,
  onSendMessage,
  onSendImage,
  onBookSession,
  onReport,
  onBlock
}: MessageInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      setIsUploading(true);

      // Get upload URL from server
      const uploadResponse = await fetch('/api/messages/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadURL } = await uploadResponse.json();

      // Upload file to storage
      const uploadResult = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResult.ok) {
        throw new Error('Failed to upload image');
      }

      // Finalize the upload
      const finalizeResponse = await fetch('/api/messages/finalize-image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageURL: uploadURL.split('?')[0], // Remove query parameters
        }),
      });

      if (!finalizeResponse.ok) {
        throw new Error('Failed to finalize image upload');
      }

      const { objectPath } = await finalizeResponse.json();
      
      // Send the image message
      onSendImage(objectPath);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={contactImage} alt={contactName} />
              <AvatarFallback>{contactName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-status-online border-2 border-background rounded-full" />
            )}
          </div>
          
          <div>
            <h3 className="font-semibold" data-testid="text-contact-name">{contactName}</h3>
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
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            data-testid="button-upload-image"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isUploading ? "Uploading image..." : "Type a message..."}
            className="flex-1"
            disabled={isUploading}
            data-testid="input-message"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!newMessage.trim() || isUploading}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
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