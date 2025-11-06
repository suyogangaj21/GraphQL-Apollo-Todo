import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient({
  log: ["query", "error"],
  errorFormat: "pretty",
});

export default prisma;
