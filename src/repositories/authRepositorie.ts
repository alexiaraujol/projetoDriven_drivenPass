import prisma from "../database/database";

export async function findByEmail (email: string){
   return await prisma.user.findFirst({
        where:{
            email
        }
    })

}


export async function create(name: string, email:string, password:string){
    return await prisma.user.create({
        data: {name, email, password}
    })


}