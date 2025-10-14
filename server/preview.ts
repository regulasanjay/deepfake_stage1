import { analyzeVideo } from "./deepfake-detector";

async function main() {
  const buffer = Buffer.alloc(1024, 0);
  const result = await analyzeVideo({
    fileName: "sample.mp4",
    fileSize: buffer.length,
    fileType: "video/mp4",
    buffer,
  });
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
