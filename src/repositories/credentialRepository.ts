import prisma from "../database/database";


export async function findByUserIdAndTitle(userId: number, title: string) {
    return await prisma.credentials.findUnique({
        where: { 
            title_userId: {
                title,
                userId
            }
        }
    });
}

export async function insert(url: string, title: string, username: string, password: string, userId: number) {
    return await prisma.credentials.create({
        data: {
            title,
            url,
            username,
            password,
            userId
        }
    })
}

export async function findAll(userId: number) {
    return await prisma.credentials.findMany({
        where: { 
            userId
        }
    });
}

export async function findById(id: number) {
    return await prisma.credentials.findUnique({
        where: {
            id
        }
    });
}

export async function deleteCredential(id: number) {
    return await prisma.credentials.delete({
        where: {
            id
        }
    });
}