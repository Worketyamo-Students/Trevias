import app from "./app";
import logger from "./utils/logger";
import { prisma } from "./config/db";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await prisma.$connect();
    logger.info("Database connected");
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
}

start();