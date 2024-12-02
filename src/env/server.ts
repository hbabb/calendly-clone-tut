import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { type ZodError, z } from "zod";

config({ path: ".env" });

console.log("Loaded Environment Variables:", process.env);

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  onValidationError: (error: ZodError) => {
    console.error("❌ Invalid environment variables:", error.message);
    process.exit(1);
  },
  onInvalidAccess: (variable: string) => {
    throw new Error(
      `❌ Attempted to access a server-side environment variable: ${variable} on the client`,
    );
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});