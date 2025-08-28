"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByEmail = findByEmail;
exports.create = create;
const database_1 = __importDefault(require("../database/database"));
async function findByEmail(email) {
    return await database_1.default.user.findFirst({
        where: {
            email
        }
    });
}
async function create(name, email, password) {
    return await database_1.default.user.create({
        data: { name, email, password }
    });
}
