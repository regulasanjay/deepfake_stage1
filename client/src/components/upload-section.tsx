import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, Cloud, Video } from "lucide-react";

interface UploadSectionProps {
  onFileSelect: (file: File | null) => void; // Allow null for removal
  selectedFile: File | null;
  onStartAnalysis: () => void;
}

export function UploadSection({ onFileSelect, selectedFile, onStartAnalysis }: UploadSectionProps) {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      let message = "Failed to upload file";

      if (error.code === 'file-too-large') {
        message = "File is too large. Maximum size is 500MB.";
      } else if (error.code === 'file-invalid-type') {
        message = "Invalid file type. Please upload MP4, AVI, or MOV files only.";
      }

      alert(message);
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/avi': ['.avi'],
      'video/quicktime': ['.mov'],
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <section id="upload" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Upload Video for Analysis</h2>
          <p className="text-muted-foreground">
            Our AI will analyze your video for signs of manipulation using advanced deepfake detection
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-border bg-card hover:border-primary/50 hover:bg-card/80'
            }
          `}
          data-testid="dropzone-upload"
        >
          <input {...getInputProps()} />

          {!selectedFile ? (
            <div className="flex flex-col items-center gap-4">
              <div className={`
                w-24 h-24 rounded-full flex items-center justify-center
                ${isDragActive ? 'bg-primary/10' : 'bg-primary/5'}
                transition-colors
              `}>
                <Upload className={`w-12 h-12 ${isDragActive ? 'text-primary' : 'text-primary/60'}`} />
              </div>

              <div>
                <p className="text-lg font-semibold mb-2">
                  {isDragActive ? 'Drop your video here' : 'Drag & drop your video here'}
                </p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span>MP4, AVI, MOV</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span>Max 500MB</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-6 bg-background rounded-lg p-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <File className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" data-testid="text-filename">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect(null); // Pass null to indicate removal
                }}
                className="px-4 h-9 rounded-md border border-border hover-elevate active-elevate-2 font-medium text-sm"
                data-testid="button-remove-file"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="mt-6 text-center">
            <button
              onClick={onStartAnalysis}
              className="px-8 h-12 rounded-md bg-primary text-primary-foreground font-semibold text-lg hover-elevate active-elevate-2 shadow-lg"
              data-testid="button-start-analysis"
            >
              Start Analysis
            </button>
          </div>
        )}
      </div>
    </section>
  );
}