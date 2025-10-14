import { Shield, CheckCircle, Lock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[hsl(217,70%,25%)] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
          AI-Powered Deepfake Detection
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
          Advanced dual-stream architecture with spatial and temporal attention analysis to identify manipulated videos
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">No Login Required</span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Free Analysis</span>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            <Lock className="w-5 h-5" />
            <span className="text-sm font-medium">Secure Processing</span>
          </div>
        </div>
        
        <a
          href="#upload"
          className="inline-flex items-center gap-2 px-8 h-12 rounded-md bg-white text-primary font-semibold text-lg hover-elevate active-elevate-2 shadow-xl"
          data-testid="link-get-started"
        >
          Get Started
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
}
