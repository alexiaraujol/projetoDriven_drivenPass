"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cryptr_1 = __importDefault(require("cryptr"));
const cryptr = new cryptr_1.default(process.env.CRYPT_SECRET);
async function hashPassword(password) {
    const bcryptSalt = await bcryptjs_1.default.genSalt();
    return await bcryptjs_1.default.hash(password, bcryptSalt);
}
async function checkPassword(password, hashPassword) {
    return await bcryptjs_1.default.compare(password, hashPassword);
}
async function encrypt(data) {
    return cryptr.encrypt(data);
}
function decrypt(data) {
    return cryptr.decrypt(data);
}
