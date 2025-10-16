import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const videoAnalyses = pgTable("video_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  duration: integer("duration"),
  resolution: text("resolution"),
  frameRate: integer("frame_rate"),
  isAuthentic: boolean("is_authentic").notNull(),
  confidenceScore: integer("confidence_score").notNull(),
  spatialScore: integer("spatial_score").notNull(),
  temporalScore: integer("temporal_score").notNull(),
  faceManipulationScore: integer("face_manipulation_score").notNull(),
  audioVisualSyncScore: integer("audio_visual_sync_score").notNull(),
  compressionArtifactsScore: integer("compression_artifacts_score").notNull(),
  frameConfidenceData: jsonb("frame_confidence_data").notNull().$type<number[]>(),
  analysisStages: jsonb("analysis_stages").notNull().$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVideoAnalysisSchema = createInsertSchema(videoAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertVideoAnalysis = z.infer<typeof insertVideoAnalysisSchema>;
export type VideoAnalysis = typeof videoAnalyses.$inferSelect;
// Table-level insert type that matches Drizzle column types exactly
export type TableInsertVideoAnalysis = typeof videoAnalyses.$inferInsert;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
