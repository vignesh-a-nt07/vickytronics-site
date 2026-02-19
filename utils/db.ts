import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Use dummy DB URL during build if DATABASE_URL not present
  const databaseUrl =
    process.env.DATABASE_URL ||
    "mysql://dummy:dummy@localhost:3306/dummy";

  // Only log in development
  if (process.env.NODE_ENV === "development" && process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    console.log(
      ` Database connection: ${url.protocol}//${url.hostname}:${url.port || "3306"}`
    );
    console.log(
      ` SSL Mode: ${url.searchParams.get("sslmode") || "not specified"}`
    );
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error", "warn"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
