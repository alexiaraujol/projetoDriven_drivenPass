import prisma from "../database/database";
import { ICardNoUserId } from "../interfaces/cardInterface";

export async function findByUserIdandTittle(userId: number, title: string){
    return await prisma.card.findUnique({
        where:{
            userId_title: {
                userId,
                title
            }
        }
    })
}
export async function insert (card: ICardNoUserId , userId:number, encruptPassword: string, encryptCVV: string){
    return await prisma.card.create({
        data:{...card,userId, CardPassword: encruptPassword, CardCVV: encryptCVV}
    })
}
export async function findById(id:number){
    return await prisma.card.findMany({
        where: {
            id
        }
    })
}

export async function deleteCard(id:number){
    return await prisma.card.delete({
        where: {
            id
        }
    })
}