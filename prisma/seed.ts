import prisma from "../src/database/database"

async function main() {
    await prisma.user.upsert({
        where: {
            email: "email@demo.com"
        },
        update: {},
        create: {
            name: "demo_user",
            email: "email@demo.com",
            password: "senha_segura"
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1)
    })