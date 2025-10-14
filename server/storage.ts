import { type User, type InsertUser, type VideoAnalysis, type InsertVideoAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createVideoAnalysis(analysis: InsertVideoAnalysis): Promise<VideoAnalysis>;
  getVideoAnalysis(id: string): Promise<VideoAnalysis | undefined>;
  getAllVideoAnalyses(): Promise<VideoAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private videoAnalyses: Map<string, VideoAnalysis>;

  constructor() {
    this.users = new Map();
    this.videoAnalyses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createVideoAnalysis(insertAnalysis: InsertVideoAnalysis): Promise<VideoAnalysis> {
    const id = randomUUID();
    const analysis: VideoAnalysis = {
      ...insertAnalysis,
      id,
      createdAt: new Date(),
    };
    this.videoAnalyses.set(id, analysis);
    return analysis;
  }

  async getVideoAnalysis(id: string): Promise<VideoAnalysis | undefined> {
    return this.videoAnalyses.get(id);
  }

  async getAllVideoAnalyses(): Promise<VideoAnalysis[]> {
    return Array.from(this.videoAnalyses.values());
  }
}

export const storage = new MemStorage();
