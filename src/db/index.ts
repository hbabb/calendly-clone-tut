import { env } from "@/env/server";
import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(env.DATABASE_URL);

const db = drizzle(sql);

export { db };
