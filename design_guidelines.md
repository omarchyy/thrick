# Thrive Wellness App Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from wellness and productivity apps like Headspace, Calm, and Notion, focusing on gentle, encouraging interfaces that promote wellbeing and habit formation.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 142 71% 45% (calming teal-green)
- Secondary: 220 13% 91% (soft gray backgrounds)
- Accent: 31 100% 71% (warm orange for progress/achievements)
- Text: 220 9% 46% (muted charcoal)
- Success: 142 76% 36% (deeper green for completed quests)

**Dark Mode:**
- Primary: 142 50% 55% (lighter teal for contrast)
- Background: 220 13% 9% (deep charcoal)
- Surface: 220 13% 16% (elevated card backgrounds)
- Text: 220 9% 83% (soft white)
- Accent: 31 100% 65% (slightly muted orange)

### Typography
- Primary: Inter (Google Fonts) - clean, readable, modern
- Headings: Inter Medium/Semibold (24px, 20px, 18px)
- Body: Inter Regular (16px for main text, 14px for secondary)
- Quest titles: Inter Medium 16px
- Small text/metadata: Inter Regular 12px

### Layout System
**Tailwind Spacing**: Use units of 2, 4, 6, and 8 for consistent rhythm
- Component spacing: p-4, p-6
- Section gaps: space-y-6, gap-8
- Card margins: m-2, m-4
- Icon sizes: w-6 h-6 (24px), w-8 h-8 (32px)

### Component Library

**Cards**: Rounded corners (rounded-xl), soft shadows, clean borders
**Quest Cards**: 
- Horizontal layout with icon, title, description, progress indicator
- Soft background with subtle border
- Progress bar at bottom showing completion percentage

**Journey Cards**:
- Larger vertical cards with category icon at top
- Title, brief description, quest count
- Progress indicator showing completed/total quests

**Navigation**:
- Bottom tab bar with rounded icons
- Clean, minimal top navigation with greeting
- Smooth transitions between sections

**Progress Elements**:
- Circular progress rings for individual quests
- Linear progress bars for journeys
- Subtle animations for completion states

## Key Screens Layout

**Homepage**:
- Personalized greeting header
- "Today's Plan" section with active quests
- Quick stats (streaks, completed quests)
- Recent achievements section
- Gentle call-to-action for new activities

**Browse Page**:
- Search bar at top
- Category filters (Mindfulness, Movement, Kindness, etc.)
- Grid/list toggle for quest/journey viewing
- Featured journeys section
- Trending quests carousel

## Visual Hierarchy
- Use generous whitespace for breathing room
- Card-based design with consistent elevation
- Clear visual separation between quest types
- Soft, encouraging micro-interactions
- Progress visualization as primary motivator

## Images
**Icons**: Use Heroicons for consistent, clean iconography throughout
**Quest Category Icons**: Colorful, rounded icons representing different wellness activities (walking figure, meditation pose, heart for kindness, etc.)
**No Hero Images**: Focus on clean, functional design with iconography and color rather than large imagery
**Avatar/Profile**: Small circular profile images where needed
**Achievement Badges**: Simple, colorful badge designs for milestones

## Interaction Design
- Gentle haptic feedback for quest completion
- Smooth card animations when browsing
- Encouraging micro-animations for progress updates
- Subtle color transitions for state changes
- No distracting or overwhelming animations - keep it calm and focused

This design emphasizes wellness, progress, and gentle encouragement while maintaining the clean, modern aesthetic shown in your reference image.