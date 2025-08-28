"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUserIdAndTitle = findByUserIdAndTitle;
exports.insert = insert;
exports.findAll = findAll;
exports.findById = findById;
exports.deleteNote = deleteNote;
const database_1 = __importDefault(require("../database/database"));
async function findByUserIdAndTitle(userId, title) {
    return await database_1.default.safeNote.findUnique({
        where: {
            userId_title: {
                userId,
                title
            }
        }
    });
}
async function insert(title, text, userId) {
    return await database_1.default.safeNote.create({
        data: { title, text, userId }
    });
}
async function findAll(userId) {
    return await database_1.default.safeNote.findMany({
        where: {
            userId
        }
    });
}
async function findById(id) {
    return await database_1.default.safeNote.findUnique({
        where: {
            id
        }
    });
}
async function deleteNote(id) {
    return await database_1.default.safeNote.delete({
        where: {
            id
        }
    });
}
