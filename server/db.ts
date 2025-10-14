import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;

// In production environments without a database, allow the app to boot and use
// the in-memory storage fallback. Any attempt to use the DB will fail loudly.
export const pool: Pool = connectionString
  ? new Pool({ connectionString })
  : (undefined as unknown as Pool);

export const db = connectionString
  ? drizzle({ client: pool, schema })
  : (undefined as any);
