import * as schema from "@/db/schema";
import { env } from "@/env/server";
import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, { schema });
