import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import os from "os";
import path from "path";
import fs from "fs/promises";
import { storage } from "./storage";
import { pool } from "./db";
import { analyzeVideo } from "./deepfake-detector";

// Use disk storage to avoid loading large uploads into memory
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, os.tmpdir()),
    filename: (_req, file, cb) => {
      const safeBase = path
        .basename(file.originalname)
        .replace(/[^a-zA-Z0-9._-]/g, "_");
      const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      cb(null, `${unique}-${safeBase}`);
    },
  }),
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/avi", "video/quicktime"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only MP4, AVI, and MOV files are allowed."));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Lightweight health check for uptime, DB connectivity, and RD configuration
  app.get("/health", async (_req, res) => {
    const rdConfigured = Boolean(process.env.REALITY_DEFENDER_API_KEY || process.env.RD_API_KEY);
    let dbOk = false;
    let dbError: string | undefined;

    try {
      await pool.query("select 1");
      dbOk = true;
    } catch (err) {
      dbOk = false;
      dbError = err instanceof Error ? err.message : "Unknown database error";
    }

    const statusOk = dbOk;
    res.status(statusOk ? 200 : 503).json({
      status: statusOk ? "ok" : "degraded",
      uptimeSec: Math.round(process.uptime()),
      environment: app.get("env"),
      rd: { configured: rdConfigured },
      db: { ok: dbOk, error: dbError },
    });
  });

  app.post("/api/analyze", upload.single('video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No video file uploaded" });
      }

      // Validate file size
      if (req.file.size > 500 * 1024 * 1024) {
        return res.status(400).json({ error: "File size exceeds 500MB limit" });
      }

      // Validate file type
      const allowedTypes = ['video/mp4', 'video/avi', 'video/quicktime'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Invalid file type. Only MP4, AVI, and MOV files are allowed" });
      }

      const videoMetadata = {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        filePath: (req.file as any).path,
      };

      const analysisData = await analyzeVideo(videoMetadata);
      
      const analysis = await storage.createVideoAnalysis(analysisData);

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Analysis failed. Please try again." });
      }
    } finally {
      // Cleanup uploaded temp file
      try {
        if (req.file && (req.file as any).path) {
          await fs.unlink((req.file as any).path);
        }
      } catch {
        // ignore cleanup errors
      }
    }
  });

  app.get("/api/analyses", async (req, res) => {
    try {
      const analyses = await storage.getAllVideoAnalyses();
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching analyses:", error);
      res.status(500).json({ error: "Failed to fetch analyses" });
    }
  });

  app.get("/api/analyses/:id", async (req, res) => {
    try {
      const analysis = await storage.getVideoAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ error: "Failed to fetch analysis" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
