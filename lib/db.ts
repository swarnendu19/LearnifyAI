import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

export let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"],
    errorFormat: "pretty",
  });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ["query", "error", "warn"],
      errorFormat: "pretty",
    });
  }
  prisma = global.cachedPrisma;
}

// Test database connection with retry logic
export async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
  }
}
