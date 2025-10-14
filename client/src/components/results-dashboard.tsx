import { CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { VideoAnalysis } from "@shared/schema";

interface ResultsDashboardProps {
  analysis: VideoAnalysis;
}

export function ResultsDashboard({ analysis }: ResultsDashboardProps) {
  const isAuthentic = analysis.isAuthentic;
  const confidence = analysis.confidenceScore;

  return (
    <section className="py-16 bg-card/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-3 border-2" style={{
            borderColor: isAuthentic ? 'hsl(160 84% 39%)' : 'hsl(0 73% 50%)'
          }}>
            <CardContent className="p-8">
              <div className="text-center">
                <div className={`
                  inline-flex items-center justify-center w-32 h-32 rounded-full mb-6
                  ${isAuthentic ? 'bg-[hsl(160,84%,39%)]/10' : 'bg-destructive/10'}
                `}>
                  {isAuthentic ? (
                    <CheckCircle className="w-16 h-16 text-[hsl(160,84%,39%)]" />
                  ) : (
                    <AlertTriangle className="w-16 h-16 text-destructive" />
                  )}
                </div>

                <h2 className={`
                  text-4xl font-bold mb-4
                  ${isAuthentic ? 'text-[hsl(160,84%,39%)]' : 'text-destructive'}
                `} data-testid="text-verdict">
                  {isAuthentic ? 'AUTHENTIC VIDEO' : 'DEEPFAKE DETECTED'}
                </h2>

                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {isAuthentic 
                    ? 'Our analysis indicates this video has not been manipulated. No significant signs of deepfake technology were detected.'
                    : 'Our analysis has detected signs of AI manipulation in this video. This content may have been synthetically generated or altered using deepfake technology.'
                  }
                </p>

                <div className="relative inline-block group">
                  <svg className="w-48 h-48 drop-shadow-lg" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="12"
                      opacity="0.3"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke={isAuthentic ? 'hsl(160, 84%, 39%)' : 'hsl(0, 73%, 50%)'}
                      strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 80}`}
                      strokeDashoffset={`${2 * Math.PI * 80 * (1 - confidence / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      className="transition-all duration-1000 ease-out"
                      filter="drop-shadow(0 0 8px currentColor)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold font-mono transition-transform group-hover:scale-110" data-testid="text-confidence">{confidence}%</p>
                    <p className="text-sm text-muted-foreground font-medium">Confidence</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Analysis Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Spatial Analysis</span>
                    <span className="text-sm font-mono text-muted-foreground">{analysis.spatialScore}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-chart-1 transition-all duration-500"
                      style={{ width: `${analysis.spatialScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Temporal Analysis</span>
                    <span className="text-sm font-mono text-muted-foreground">{analysis.temporalScore}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-chart-2 transition-all duration-500"
                      style={{ width: `${analysis.temporalScore}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3">Video Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">File Name</dt>
                      <dd className="font-mono text-right truncate ml-4 max-w-[60%]" data-testid="text-video-filename">{analysis.fileName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Resolution</dt>
                      <dd className="font-mono">{analysis.resolution}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Frame Rate</dt>
                      <dd className="font-mono">{analysis.frameRate} FPS</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Duration</dt>
                      <dd className="font-mono">{Math.floor(analysis.duration! / 60)}:{String(analysis.duration! % 60).padStart(2, '0')}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
