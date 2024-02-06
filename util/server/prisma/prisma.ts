import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const { signup } = prisma;

export { prisma, signup };
