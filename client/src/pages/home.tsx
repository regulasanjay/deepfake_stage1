import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { UploadSection } from "@/components/upload-section";
import { AnalysisProgress } from "@/components/analysis-progress";
import { ResultsDashboard } from "@/components/results-dashboard";
import { TechnicalAnalysis } from "@/components/technical-analysis";
import { CybercrimeReport } from "@/components/cybercrime-report";
import { useToast } from "@/hooks/use-toast";
import type { VideoAnalysis } from "@shared/schema";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VideoAnalysis | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File | null) => {
    setUploadedFile(file);
    setAnalysisComplete(false);
    setAnalysisResult(null);
  };

  const handleStartAnalysis = async () => {
    if (!uploadedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size
    if (uploadedFile.size > 500 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Maximum file size is 500MB. Please select a smaller file.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("video", uploadedFile);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis failed');
      }
      
      const data = await response.json();
      setAnalysisId(data.id);
      
      // Simulate analysis progress with realistic timing
      setTimeout(() => {
        setAnalysisResult(data);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        
        toast({
          title: data.isAuthentic ? "✓ Video Authentic" : "⚠ Deepfake Detected",
          description: data.isAuthentic 
            ? "No signs of manipulation detected in this video."
            : "This video shows signs of AI manipulation.",
          variant: data.isAuthentic ? "default" : "destructive",
        });
      }, 5000);
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An error occurred while analyzing the video. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNewAnalysis = () => {
    setUploadedFile(null);
    setAnalysisId(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Deepfake Detector</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Video Analysis</p>
            </div>
          </div>
          {analysisComplete && (
            <button
              onClick={handleNewAnalysis}
              className="px-4 h-9 rounded-md bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2"
              data-testid="button-new-analysis"
            >
              New Analysis
            </button>
          )}
        </div>
      </header>

      <main>
        {!uploadedFile && !analysisComplete && <HeroSection />}
        
        {!isAnalyzing && !analysisComplete && (
          <UploadSection
            onFileSelect={handleFileSelect}
            selectedFile={uploadedFile}
            onStartAnalysis={handleStartAnalysis}
          />
        )}

        {isAnalyzing && uploadedFile && (
          <AnalysisProgress fileName={uploadedFile.name} />
        )}

        {analysisComplete && analysisResult && (
          <>
            <ResultsDashboard analysis={analysisResult} />
            <TechnicalAnalysis analysis={analysisResult} />
            <CybercrimeReport analysis={analysisResult} />
          </>
        )}
      </main>

      <footer className="border-t mt-24 py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About the Technology</h3>
              <p className="text-sm text-muted-foreground">
                Our dual-stream architecture uses CNN backbones with long-distance attention mechanisms to detect subtle inconsistencies in videos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                All videos are analyzed securely and deleted after processing. We do not store any personal information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                For technical support or reporting issues, please contact our security team.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
