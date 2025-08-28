"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = deleteUserById;
const database_1 = __importDefault(require("../database/database"));
async function deleteUserById(userId) {
    await database_1.default.credentials.deleteMany({ where: { userId } });
    await database_1.default.safeNote.deleteMany({ where: { userId } });
    await database_1.default.card.deleteMany({ where: { userId } });
    await database_1.default.user.delete({
        where: {
            id: userId
        }
    });
}
