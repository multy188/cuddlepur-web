# Cuddle App Design Guidelines

Based on the uploaded specifications, here are the comprehensive design guidelines for the Cuddle App:

## Design Approach
**Reference-Based Approach**: Drawing inspiration from social and relationship-focused platforms like Bumble, Hinge, and wellness apps like Calm, creating a warm, inviting, and trust-building interface that prioritizes emotional connection and safety.

## Core Design Principles
- **Warmth & Comfort**: Create a cozy, inviting atmosphere that makes users feel safe and welcomed
- **Trust & Safety**: Visual design should emphasize security, verification, and community guidelines
- **Emotional Connection**: Design should facilitate meaningful connections through thoughtful UX patterns
- **Inclusivity**: Welcoming design for all relationship styles and orientations

## Color Palette

### Primary Colors
- **Calming Blue**: 225 83% 57% (#2563EB) - Main brand color for primary actions and highlights
- **Soft Green**: 160 95% 31% (#059669) - Secondary brand color for verified states and positive actions
- **Clean White**: 220 14% 98% (#F8FAFC) - Primary background for light mode

### Supporting Colors
- **Warm Orange**: 22 93% 48% (#EA580C) - Accent color for notifications and highlights
- **Success Green**: 160 84% 39% (#10B981) - Success states, verified profiles, safety indicators
- **Warning Amber**: 48 95% 53% (#F59E0B) - Warning states and caution indicators
- **Error Red**: 0 84% 60% (#EF4444) - Error states and critical alerts
- **Neutral Gray**: 220 13% Various lightness - Subtle backgrounds, cards, dividers

### Dark Mode
- **Deep Navy**: 220 13% 9% - Primary dark background
- **Charcoal Gray**: 220 13% 18% - Card backgrounds
- **Muted Blue**: 225 83% 57% - Primary elements in dark mode (same as light mode primary)

## Typography
- **Primary**: Inter (Google Fonts) - Clean, modern, highly readable
- **Secondary**: Poppins (Google Fonts) - Friendly headers and emphasis
- **Sizes**: Text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px)

## Layout System
**Spacing Units**: Consistent use of Tailwind units 2, 4, 6, 8, 12, and 16
- **p-4**: Standard card padding
- **gap-6**: Component spacing
- **mb-8**: Section separation

## Component Library

### Navigation
- **Bottom Tab Bar**: Primary navigation with rounded icons
- **Top Header**: Clean with profile access and settings
- **Search Bar**: Prominent, rounded with soft shadows

### Cards & Profiles
- **Profile Cards**: Rounded corners (rounded-xl), soft shadows, warm backgrounds
- **Photo Galleries**: Smooth carousel with dot indicators
- **Match Cards**: Swipe-friendly design with gradient overlays

### Forms & Interactions
- **Input Fields**: Rounded, warm borders, focus states in brand colors
- **Buttons**: Rounded-full for primary actions, soft shadows
- **Toggles**: Custom-styled with brand colors

### Safety Features
- **Verification Badges**: Green checkmarks with subtle glow effects
- **Report/Block**: Clearly accessible but not prominent
- **Safety Center**: Dedicated section with calming design

## Specific Screens

### Onboarding
- **Welcome Screen**: Large hero illustration of diverse people cuddling safely
- **Registration**: Progressive disclosure, warm encouraging copy
- **Profile Setup**: Step-by-step with preview cards

### Discovery
- **Browse Feed**: Card-based layout with filtering options
- **Profile View**: Full-screen with photo carousel and compatibility metrics
- **Matching**: Swipe interface with gentle animations

### Messaging
- **Chat List**: Clean list with last message preview and online indicators
- **Chat Interface**: Bubble design with timestamp grouping
- **Video Chat**: Clean interface with safety tools readily available

### Safety & Trust
- **Verification Flow**: Clear steps with progress indicators
- **Community Guidelines**: Easily digestible with illustrations
- **Safety Center**: Comprehensive resources with calming design

## Images
- **Hero Image**: Large, diverse illustration of people in comfortable, platonic cuddling positions - warm, inclusive, and non-sexual
- **Onboarding Illustrations**: Series of friendly, diverse characters showing safe connection
- **Safety Icons**: Custom iconography for verification, reporting, and community guidelines
- **Profile Placeholders**: Warm, abstract patterns when photos aren't available

## Animations
Use sparingly and subtly:
- **Card Transitions**: Gentle slide and fade effects
- **Loading States**: Soft pulse animations in brand colors
- **Match Celebrations**: Brief, joyful micro-interactions

## Accessibility
- High contrast ratios for all text
- Clear focus indicators
- Screen reader friendly navigation
- Consistent dark mode implementation across all components
- Large touch targets (minimum 44px) for mobile interactions

This design system creates a trustworthy, warm environment that encourages genuine human connection while prioritizing user safety and comfort.