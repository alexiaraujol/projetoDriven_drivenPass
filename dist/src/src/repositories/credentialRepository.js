"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUserIdAndTitle = findByUserIdAndTitle;
exports.insert = insert;
exports.findAll = findAll;
exports.findById = findById;
exports.deleteCredential = deleteCredential;
const database_1 = __importDefault(require("../database/database"));
async function findByUserIdAndTitle(userId, title) {
    return await database_1.default.credentials.findUnique({
        where: {
            userId_title: {
                title,
                userId
            }
        }
    });
}
async function insert(url, title, username, password, userId) {
    return await database_1.default.credentials.create({
        data: {
            title,
            url,
            username,
            password,
            userId
        }
    });
}
async function findAll(userId) {
    return await database_1.default.credentials.findMany({
        where: {
            userId
        }
    });
}
async function findById(id) {
    return await database_1.default.credentials.findUnique({
        where: {
            id
        }
    });
}
async function deleteCredential(id) {
    return await database_1.default.credentials.delete({
        where: {
            id
        }
    });
}
