import prisma from "../database/database";

export async function deleteUserById(userId: number) {

     await prisma.credentials.deleteMany({ where: { userId } });
     await prisma.safeNote.deleteMany({ where: { userId } });
     await prisma.card.deleteMany({ where: { userId } });

     await prisma.user.delete({
          where: {
               id: userId
          }
     })

}