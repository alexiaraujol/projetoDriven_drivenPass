"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = createNewUser;
exports.login = login;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customErrorModel_1 = require("../models/customErrorModel");
const userRepositorie = __importStar(require("../repositories/authRepositorie"));
const encryptUtil = __importStar(require("../utils/encryptUtil"));
async function createNewUser(name, email, password) {
    const registered = await isRegistered(email);
    if (registered) {
        throw new customErrorModel_1.CustomError(`Usuário já cadastrado`, 409, `Cadastre um novo email. `);
    }
    if (name === '') {
        throw new customErrorModel_1.CustomError(`Nome inválido`, 400, `Cadastre um nome válido`);
    }
    const hashPassword = await encryptUtil.hashPassword(password);
    await userRepositorie.create(name, email, hashPassword);
}
async function login(email, password) {
    const registeredUser = await isRegistered(email);
    if (!registeredUser) {
        throw new customErrorModel_1.CustomError(`Usuário não encontrado!`, 404, `Verifique se você errou o login ou a senha!!`);
    }
    const valid = await encryptUtil.checkPassword(password, registeredUser.password);
    if (valid) {
        return jsonwebtoken_1.default.sign({ userId: registeredUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
    }
    else {
        throw new customErrorModel_1.CustomError(`Usuário não encontrado!`, 404, `Verifique se você errou o login ou a senha!! `);
    }
}
async function isRegistered(email) {
    const register = await userRepositorie.findByEmail(email);
    if (register)
        return register;
    return false;
}
