import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface AnalysisProgressProps {
  fileName: string;
}

const stages = [
  { name: "Uploading", message: "Securing video upload..." },
  { name: "Analyzing Frames", message: "Extracting and analyzing video frames..." },
  { name: "Spatial Analysis", message: "Detecting spatial inconsistencies..." },
  { name: "Temporal Analysis", message: "Analyzing temporal patterns..." },
  { name: "Processing", message: "Applying long-distance attention mechanism..." },
  { name: "Complete", message: "Finalizing analysis results..." },
];

export function AnalysisProgress({ fileName }: AnalysisProgressProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 2;
        return prev;
      });
    }, 100);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Analyzing Video</h2>
            <p className="text-sm text-muted-foreground font-mono">{fileName}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stages[currentStage].message}</span>
                <span className="font-mono text-primary">{Math.min(progress, 100)}%</span>
              </div>
              <div className="h-3 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 ease-out relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  data-testid="progress-bar"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {stages.map((stage, index) => (
                <div
                  key={stage.name}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md text-sm
                    ${index <= currentStage 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'bg-background text-muted-foreground'
                    }
                    transition-all duration-300
                  `}
                  data-testid={`stage-${stage.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className={`
                    w-2 h-2 rounded-full
                    ${index < currentStage 
                      ? 'bg-primary' 
                      : index === currentStage 
                        ? 'bg-primary animate-pulse' 
                        : 'bg-muted-foreground/30'
                    }
                  `} />
                  <span className="truncate">{stage.name}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Frame Rate</p>
                  <p className="font-mono font-semibold">30 FPS</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Resolution</p>
                  <p className="font-mono font-semibold">1920x1080</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Duration</p>
                  <p className="font-mono font-semibold">0:45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
