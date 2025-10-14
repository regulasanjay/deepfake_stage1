import { type User, type InsertUser, type VideoAnalysis, type InsertVideoAnalysis, users, videoAnalyses } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createVideoAnalysis(analysis: InsertVideoAnalysis): Promise<VideoAnalysis>;
  getVideoAnalysis(id: string): Promise<VideoAnalysis | undefined>;
  getAllVideoAnalyses(): Promise<VideoAnalysis[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createVideoAnalysis(insertAnalysis: InsertVideoAnalysis): Promise<VideoAnalysis> {
    const analysisData = insertAnalysis;
    const [analysis] = await db
      .insert(videoAnalyses)
      .values(analysisData)
      .returning();
    return analysis;
  }

  async getVideoAnalysis(id: string): Promise<VideoAnalysis | undefined> {
    const [analysis] = await db.select().from(videoAnalyses).where(eq(videoAnalyses.id, id));
    return analysis || undefined;
  }

  async getAllVideoAnalyses(): Promise<VideoAnalysis[]> {
    const analyses = await db.select().from(videoAnalyses).orderBy(desc(videoAnalyses.createdAt));
    return analyses;
  }
}

export const storage = new DatabaseStorage();
