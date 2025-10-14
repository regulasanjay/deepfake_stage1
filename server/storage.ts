import { type User, type InsertUser, type VideoAnalysis, type VideoAnalysisInsert, type InsertVideoAnalysis, users, videoAnalyses } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

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
    const { db } = await import("./db");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import("./db");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import("./db");
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createVideoAnalysis(insertAnalysis: InsertVideoAnalysis): Promise<VideoAnalysis> {
    // Drizzle's inferred insert type for jsonb is broader (unknown[]). We validate with Zod
    // and then coerce to the DB insert type for persistence.
    const analysisData = insertAnalysis as unknown as VideoAnalysisInsert;
    const { db } = await import("./db");
    const [analysis] = await db
      .insert(videoAnalyses)
      .values(analysisData)
      .returning();
    return analysis;
  }

  async getVideoAnalysis(id: string): Promise<VideoAnalysis | undefined> {
    const { db } = await import("./db");
    const [analysis] = await db.select().from(videoAnalyses).where(eq(videoAnalyses.id, id));
    return analysis || undefined;
  }

  async getAllVideoAnalyses(): Promise<VideoAnalysis[]> {
    const { db } = await import("./db");
    const analyses = await db.select().from(videoAnalyses).orderBy(desc(videoAnalyses.createdAt));
    return analyses;
  }
}

class MemoryStorage implements IStorage {
  private users: User[] = [];
  private analyses: VideoAnalysis[] = [];

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = { id: randomUUID(), ...insertUser };
    this.users.push(user);
    return user;
  }

  async createVideoAnalysis(analysis: InsertVideoAnalysis): Promise<VideoAnalysis> {
    const record: VideoAnalysis = {
      id: randomUUID(),
      createdAt: new Date(),
      ...analysis,
    } as VideoAnalysis;
    this.analyses.push(record);
    return record;
  }

  async getVideoAnalysis(id: string): Promise<VideoAnalysis | undefined> {
    return this.analyses.find(a => a.id === id);
  }

  async getAllVideoAnalyses(): Promise<VideoAnalysis[]> {
    return [...this.analyses].sort((a, b) => +b.createdAt - +a.createdAt);
  }
}

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemoryStorage();
