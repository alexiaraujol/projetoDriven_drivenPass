import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

console.log(process.env.DATABASE_URL)

export default prisma; 