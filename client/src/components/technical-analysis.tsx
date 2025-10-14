import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Eye, Volume2, AlertCircle } from "lucide-react";
import type { VideoAnalysis } from "@shared/schema";

interface TechnicalAnalysisProps {
  analysis: VideoAnalysis;
}

export function TechnicalAnalysis({ analysis }: TechnicalAnalysisProps) {
  const [activeTab, setActiveTab] = useState("spatial");

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[hsl(160,84%,39%)]';
    if (score >= 60) return 'text-[hsl(32,95%,44%)]';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-[hsl(160,84%,39%)]';
    if (score >= 60) return 'bg-[hsl(32,95%,44%)]';
    return 'bg-destructive';
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Technical Analysis</h2>
          <p className="text-muted-foreground">
            Detailed breakdown of our dual-stream architecture analysis
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid" data-testid="tabs-analysis">
            <TabsTrigger value="spatial" data-testid="tab-spatial">Spatial Analysis</TabsTrigger>
            <TabsTrigger value="temporal" data-testid="tab-temporal">Temporal Analysis</TabsTrigger>
            <TabsTrigger value="metrics" data-testid="tab-metrics">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="spatial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Frame-by-Frame Confidence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-1">
                  {analysis.frameConfidenceData.map((confidence, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t relative group"
                      style={{ height: `${confidence}%` }}
                      data-testid={`frame-bar-${index}`}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover border px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Frame {index + 1}: {confidence}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <span>Frame 1</span>
                  <span>Frame {analysis.frameConfidenceData.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spatial analysis examines individual frames for visual inconsistencies, focusing on facial features, 
                  lighting patterns, and texture anomalies. Our CNN backbone detects subtle artifacts that indicate manipulation.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="temporal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Temporal Consistency Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Frame Transition Consistency</span>
                      <span className="text-sm font-mono">{analysis.temporalScore}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getScoreBg(analysis.temporalScore)} transition-all duration-500`}
                        style={{ width: `${analysis.temporalScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-card border">
                      <p className="text-sm text-muted-foreground mb-2">Motion Flow</p>
                      <p className="text-2xl font-bold font-mono">98.5%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card border">
                      <p className="text-sm text-muted-foreground mb-2">Continuity Score</p>
                      <p className="text-2xl font-bold font-mono">96.2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Temporal analysis uses long-distance attention mechanisms to detect inconsistencies across non-consecutive frames. 
                  This approach identifies manipulation patterns that span multiple frames, revealing sophisticated deepfake techniques.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Face Manipulation Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3">
                    <p className={`text-4xl font-bold font-mono ${getScoreColor(analysis.faceManipulationScore)}`}>
                      {analysis.faceManipulationScore}%
                    </p>
                    <p className="text-sm text-muted-foreground pb-1">accuracy</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Detects facial feature inconsistencies and morphing artifacts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Audio-Visual Sync
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3">
                    <p className={`text-4xl font-bold font-mono ${getScoreColor(analysis.audioVisualSyncScore)}`}>
                      {analysis.audioVisualSyncScore}%
                    </p>
                    <p className="text-sm text-muted-foreground pb-1">sync rate</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Analyzes lip-sync and audio-visual alignment for tampering
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Compression Artifacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3">
                    <p className={`text-4xl font-bold font-mono ${getScoreColor(analysis.compressionArtifactsScore)}`}>
                      {analysis.compressionArtifactsScore}%
                    </p>
                    <p className="text-sm text-muted-foreground pb-1">detected</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Identifies unusual compression patterns from AI generation
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Attention Mechanism
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-bold font-mono text-primary">
                      Active
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Long-distance self-attention applied to non-consecutive frames
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
