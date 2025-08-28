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
exports.createCredential = createCredential;
exports.getAllCredential = getAllCredential;
exports.specificCredentials = specificCredentials;
exports.deleteCredential = deleteCredential;
const credentialService = __importStar(require("../services/credentialService"));
async function createCredential(req, res) {
    const { url, title, username, password } = req.body;
    const { userId } = res.locals;
    await credentialService.newCredential(url, title, username, password, userId);
    res.sendStatus(200);
}
async function getAllCredential(req, res) {
    const { userId } = res.locals;
    const credentials = await credentialService.allCredential(userId.userId);
    res.status(200).send(credentials);
}
async function specificCredentials(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    const credential = await credentialService.getCredentialById(parseInt(id), userId.userId);
    res.status(200).send(credential);
}
async function deleteCredential(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    await credentialService.deleteCredential(parseInt(id), userId.userId);
    res.sendStatus(202);
}
