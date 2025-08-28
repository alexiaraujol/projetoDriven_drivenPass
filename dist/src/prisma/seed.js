"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../src/database/database"));
async function main() {
    await database_1.default.user.upsert({
        where: {
            email: "email@demo.com"
        },
        update: {},
        create: {
            name: "demo_user",
            email: "email@demo.com",
            password: "senha_segura"
        }
    });
}
main()
    .then(async () => {
    await database_1.default.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await database_1.default.$disconnect();
    process.exit(1);
});
