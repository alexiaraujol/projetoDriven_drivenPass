"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUserIdandTittle = findByUserIdandTittle;
exports.insert = insert;
exports.findById = findById;
exports.deleteCard = deleteCard;
const database_1 = __importDefault(require("../database/database"));
async function findByUserIdandTittle(userId, title) {
    return await database_1.default.card.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
}
async function insert(card, userId, encruptPassword, encryptCVV) {
    return await database_1.default.card.create({
        data: { ...card, userId, CardPassword: encruptPassword, CardCVV: encryptCVV }
    });
}
async function findById(id) {
    return await database_1.default.card.findMany({
        where: {
            id
        }
    });
}
async function deleteCard(id) {
    return await database_1.default.card.delete({
        where: {
            id
        }
    });
}
