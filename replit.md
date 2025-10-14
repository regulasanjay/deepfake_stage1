# Deepfake Video Detection Application

## Overview
A comprehensive web-based deepfake video detection application that analyzes uploaded videos to determine if they are AI-generated or authentic. The application features integrated cybercrime reporting capabilities for detected fake content.

**Current Status**: MVP Complete - Full-stack application with mock detection engine

## Core Features
- **Video Upload Interface**: Drag-and-drop file upload with support for MP4, AVI, and MOV formats (up to 500MB)
- **Real-time Analysis**: Multi-stage progress indicator showing spatial and temporal analysis
- **Detection Results**: Professional dashboard displaying authenticity verdict with confidence scores
- **Technical Analysis**: Detailed breakdown with frame-by-frame confidence graphs and key metrics
- **Cybercrime Reporting**: One-click button that opens pre-filled email with detection evidence

## Technology Stack
### Frontend
- React with TypeScript
- Tailwind CSS + Shadcn UI components
- Wouter for routing
- React Dropzone for file uploads
- Recharts for data visualization
- Inter & Roboto Mono fonts

### Backend
- Express.js with TypeScript
- Multer for video file handling
- In-memory storage (MemStorage)
- Mock deepfake detection engine

### Design System
- **Primary Color**: #1E3A8A (Professional Blue) - HSL(217, 70%, 33%)
- **Alert Red**: #DC2626 - HSL(0, 73%, 50%)
- **Success Green**: #059669 - HSL(160, 84%, 39%)
- **Warning Amber**: #D97706 - HSL(32, 95%, 44%)
- **Background**: #F8FAFC - HSL(210, 40%, 98%)
- **Text**: #1E293B - HSL(217, 33%, 17%)

## Project Structure
```
/client/src
  /pages
    home.tsx - Main application page with all sections
    not-found.tsx - 404 page
  /components
    hero-section.tsx - Hero with gradient background and trust badges
    upload-section.tsx - Drag-and-drop upload interface
    analysis-progress.tsx - Animated multi-stage progress indicator
    results-dashboard.tsx - Verdict display with confidence meter
    technical-analysis.tsx - Tabbed technical analysis panel
    cybercrime-report.tsx - Report generation section
  /ui - Shadcn UI components

/server
  routes.ts - API endpoints for video analysis
  storage.ts - In-memory storage interface
  deepfake-detector.ts - Mock detection algorithm

/shared
  schema.ts - Shared TypeScript types and Zod schemas
```

## API Endpoints
- `POST /api/analyze` - Upload and analyze video file
- `GET /api/analyses` - Get all analysis results
- `GET /api/analyses/:id` - Get specific analysis by ID

## Mock Detection Algorithm
The current implementation uses a sophisticated mock detection engine that simulates:
- **Dual-stream architecture** with spatial and temporal analysis
- **CNN backbone processing** (simulating DenseNet, 3D CNN)
- **Long-distance self-attention mechanism** for non-consecutive frame analysis
- **Frame-by-frame confidence scoring** with realistic variance
- **Technical metrics**: Face manipulation, audio-visual sync, compression artifacts

### Detection Scores
- Confidence: 75-95% (varies by detection result)
- Spatial Analysis: Frame-level inconsistency detection
- Temporal Analysis: Cross-frame pattern recognition
- Face Manipulation: Facial feature consistency
- Audio-Visual Sync: Lip-sync and alignment analysis
- Compression Artifacts: AI generation pattern detection

## User Flow
1. **Landing**: Hero section with trust badges and call-to-action
2. **Upload**: Drag-and-drop video file (MP4/AVI/MOV, max 500MB)
3. **Analysis**: Real-time progress with 6 stages over ~5 seconds
4. **Results**: Verdict with confidence meter and summary
5. **Technical Details**: Tabbed analysis with graphs and metrics
6. **Reporting**: One-click email generation for cybercrime authorities

## Design Approach
Inspired by professional antivirus and security software (Malwarebytes, Norton):
- Clean, trustworthy interface with professional blue color scheme
- Clear visual hierarchy emphasizing detection results
- Smooth animations and transitions for engagement
- Responsive design for desktop and mobile
- Accessibility-first with proper ARIA labels and keyboard navigation

## Recent Changes
- **2025-10-14**: Initial MVP implementation
  - Complete frontend with all components
  - Backend API with mock detection
  - Responsive design system
  - Toast notifications for user feedback

## Next Steps (Future Enhancement)
- Integrate real deepfake detection models (DenseNet, 3D CNN, Xception)
- Implement actual long-distance self-attention mechanism
- Add batch video processing capability
- Generate downloadable PDF forensic reports
- Implement video comparison tool (original vs suspected deepfake)
- Add user authentication for saved analyses
- Deploy to production with PostgreSQL database

## Development Commands
- `npm run dev` - Start development server (frontend + backend on same port)
- Workflow "Start application" runs automatically

## Notes
- No login required for basic usage (as per requirements)
- Videos are processed in-memory and not persistently stored
- Email reporting opens user's default email client with pre-filled template
- All analysis data stored in memory (resets on server restart)
