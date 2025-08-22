import prisma from "../database/database";

export async function deleteAll() {

     await prisma.user.deleteMany({})
    
}