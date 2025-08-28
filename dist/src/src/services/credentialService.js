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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCredential = newCredential;
exports.allCredential = allCredential;
exports.getCredentialById = getCredentialById;
exports.deleteCredential = deleteCredential;
const customErrorModel_1 = require("../models/customErrorModel");
const credentialRepository = __importStar(require("../repositories/credentialRepository"));
const encryptUtil_1 = require("../utils/encryptUtil");
async function newCredential(url, title, username, password, userId) {
    const duplicateTitle = await credentialRepository.findByUserIdAndTitle(userId, title);
    if (duplicateTitle) {
        throw new customErrorModel_1.CustomError(`Título Duplicado`, 409, `O título esta duplicado!! `);
    }
    const encryptPassword = await (0, encryptUtil_1.encrypt)(password);
    await credentialRepository.insert(url, title, username, encryptPassword, userId);
}
async function allCredential(userId) {
    const credentials = await credentialRepository.findAll(userId);
    return credentials.map((credential) => {
        return {
            id: credential.id,
            url: credential.url,
            title: credential.title,
            login: credential.username,
            password: (0, encryptUtil_1.decrypt)(credential.password),
        };
    });
}
async function getCredentialById(id, userId) {
    const credential = await credentialRepository.findById(id);
    if (!credential) {
        throw new customErrorModel_1.CustomError(`Credencial não existe!`, 404, `Essa Credencial não existe!!`);
    }
    if (credential?.userId !== userId) {
        throw new customErrorModel_1.CustomError(`Credencial não pertence ao usuário!`, 406, `Essa credencial pertence não pertence ao usuário!!`);
    }
    const decryptPassword = (0, encryptUtil_1.decrypt)(credential.password);
    return { ...credential, password: decryptPassword };
}
async function deleteCredential(id, userId) {
    const credential = await credentialRepository.findById(id);
    if (!credential) {
        throw new customErrorModel_1.CustomError(`Credencial não existe!`, 404, `Essa Credencial não existe!!`);
    }
    if (credential?.userId !== userId) {
        throw new customErrorModel_1.CustomError(`Credencial não pertence ao usuário!`, 406, `Essa credencial pertence não pertence ao usuário!! `);
    }
    await credentialRepository.deleteCredential(id);
}
