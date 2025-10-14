# Deepfake Detection Application - Design Guidelines

## Design Approach

**Hybrid Approach**: Security Software Interface + Material Design Principles
- Primary inspiration: Malwarebytes, Norton, McAfee security scanning interfaces
- System foundation: Material Design for consistent component behavior
- Focus: Professional trust, clarity, and immediate comprehension of results

## Core Design Principles

1. **Trust Through Transparency**: Every analysis step visible to build user confidence
2. **Instant Clarity**: Results should be understood within 2 seconds of viewing
3. **Professional Authority**: Visual language that communicates technical credibility
4. **Action-Oriented Design**: Clear paths from detection to reporting

## Color System

**Primary Palette** (User-specified):
- Primary Blue: 217 70% 33% (#1E3A8A) - Headers, CTAs, trust elements
- Alert Red: 0 73% 50% (#DC2626) - Deepfake detected states, warnings
- Success Green: 160 84% 39% (#059669) - Authentic video confirmations
- Clean Background: 210 40% 98% (#F8FAFC) - Main canvas
- Dark Slate: 217 33% 17% (#1E293B) - Primary text, icons
- Warning Amber: 32 95% 44% (#D97706) - Caution states, processing

**Functional Colors**:
- Neutral Gray: 215 16% 47% - Secondary text, borders
- Light Gray: 214 32% 91% - Card backgrounds, dividers
- Deep Blue Gradient: From 217 70% 33% to 217 70% 25% - Premium headers
- Red Gradient: From 0 73% 50% to 0 73% 42% - Alert backgrounds

**Dark Mode** (Maintain consistency):
- Background: 217 33% 10%
- Cards: 217 33% 14%
- Text: 210 40% 98%
- Preserve all accent colors for consistent emotional response

## Typography

**Font Stack**:
- Primary: Inter (weights: 400, 500, 600, 700)
- Monospace: 'Roboto Mono' for technical data (confidence scores, file info)

**Hierarchy**:
- Hero Headlines: Inter Bold 48px/56px (3rem/3.5rem)
- Section Headers: Inter Semibold 32px/40px (2rem/2.5rem)
- Card Titles: Inter Semibold 24px/32px (1.5rem/2rem)
- Body Text: Inter Regular 16px/24px (1rem/1.5rem)
- Technical Data: Roboto Mono Medium 14px/20px (0.875rem/1.25rem)
- Captions: Inter Regular 14px/20px (0.875rem/1.25rem)

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: mb-12 to mb-16
- Card gaps: gap-6 to gap-8
- Icon-text spacing: gap-2 to gap-4

**Container Strategy**:
- Main wrapper: max-w-7xl mx-auto px-4
- Upload section: max-w-4xl centered
- Results cards: max-w-6xl with grid layout
- Technical details: max-w-prose for readability

## Component Library

### Hero Section (No Large Image)
- Clean gradient background (primary blue gradient)
- Centered headline emphasizing "AI-Powered Detection"
- Subheadline explaining dual-stream architecture capability
- Trust badges: "No Login Required • Free Analysis • Secure Processing"
- Immediate CTA to upload area (scroll anchor)

### Upload Interface
- Large drag-and-drop zone (min-height: 400px)
- Dotted border with animated pulse on hover
- Cloud upload icon (96px) in primary blue
- Clear file format indicators: "MP4, AVI, MOV supported"
- File size limit display: "Max 500MB"
- Preview thumbnail after selection with file details
- Replace file button for quick retries

### Analysis Progress Indicator
- Full-width card with gradient background
- Animated scanning line (horizontal sweep)
- Multi-stage progress: "Uploading → Analyzing Frames → Processing → Complete"
- Percentage indicator with Roboto Mono font
- Sub-status text: "Analyzing spatial patterns..." "Checking temporal consistency..."
- Estimated time remaining counter
- Technical specs displayed: Frame rate, resolution, duration

### Results Dashboard
- Split layout: Large verdict card (60%) + Technical breakdown (40%)
- Verdict card features:
  - Giant checkmark (authentic) or warning icon (deepfake) - 120px
  - Bold status headline: "AUTHENTIC VIDEO" or "DEEPFAKE DETECTED"
  - Confidence meter: Circular progress with percentage in center
  - Color-coded by result (green for authentic, red for deepfake)
  - Brief explanation paragraph
  
### Technical Analysis Panel
- Tabbed interface: "Spatial Analysis" | "Temporal Analysis" | "Frame Insights"
- Frame-by-frame confidence graph (line chart)
- Inconsistency heatmap visualization
- Key metrics grid:
  - Face manipulation score
  - Audio-visual sync rating
  - Compression artifacts detected
  - Attention mechanism findings
- Each metric with icon, label, and color-coded status bar

### Cybercrime Report Section
- Prominent card with red accent border
- Warning icon with explanatory text
- "Report to Authorities" primary button (large, red)
- Subtext: "Pre-filled email template will open with detection evidence"
- Secondary information: Links to FBI IC3, local cybercrime units
- Disclaimer text in smaller font

### Navigation (Minimal)
- Sticky header with logo and "New Analysis" button
- Breadcrumb when viewing results
- Footer with: About the Technology, Privacy Policy, Contact

## Visual Enhancements

**Micro-interactions**:
- Upload zone: Scale on hover, border color shift on drag-over
- Confidence meters: Animated fill on reveal
- Result cards: Subtle shadow lift on hover
- Buttons: Standard elevation changes (no custom animations)

**Shadows & Depth**:
- Cards: shadow-lg for primary elements
- Upload zone: shadow-xl on active state
- Results: shadow-2xl for emphasis
- Modals: shadow-2xl with backdrop blur

**Icons**:
- Use Heroicons throughout
- Security-themed: Shield, lock, check-circle, exclamation-triangle
- Upload: Cloud-arrow-up
- Analysis: Magnifying-glass, chart-bar, cpu-chip
- Report: Flag, envelope

## Images

**Primary Image**: Hero section uses gradient background ONLY (no hero image)

**Supporting Visuals**:
- **Technology Diagram**: Flowchart showing dual-stream architecture (optional in "How It Works" section)
  - Placement: Below results, educational section
  - Style: Clean, diagrammatic, using brand colors
  - Description: Visual representation of CNN backbones and attention mechanism

- **Icon Illustrations**: Custom security-themed illustrations for empty states
  - Placement: Before upload, error states
  - Style: Line art, primary blue, minimal

## Responsive Behavior

**Desktop (lg+)**: 
- Two-column results layout
- Side-by-side upload preview
- Expanded technical graphs

**Tablet (md)**:
- Single column with full-width cards
- Stacked analysis panels
- Maintained visual hierarchy

**Mobile (base)**:
- Streamlined upload interface
- Simplified graphs (tap to expand)
- Priority on verdict visibility
- Sticky report button

## Accessibility

- WCAG AA contrast ratios maintained
- Focus indicators on all interactive elements (2px ring in primary blue)
- Screen reader labels for all icons and meters
- Keyboard navigation for entire workflow
- Loading states announced with aria-live regions
- Color not sole indicator (icons + text for status)