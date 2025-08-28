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
exports.newNote = newNote;
exports.allNotes = allNotes;
exports.getNoteById = getNoteById;
exports.deleteNote = deleteNote;
const noteRepository = __importStar(require("../repositories/notesRepository"));
const customErrorModel_1 = require("../models/customErrorModel");
const encryptUtil_1 = require("../utils/encryptUtil");
async function newNote(title, text, userId) {
    const duplicateTitle = await noteRepository.findByUserIdAndTitle(userId, title);
    if (duplicateTitle) {
        throw new customErrorModel_1.CustomError(`Título Duplicado`, 409, `Seu titulo esta duplicado`);
    }
    const encryptText = await (0, encryptUtil_1.encrypt)(text);
    await noteRepository.insert(title, encryptText, userId);
}
async function allNotes(userId) {
    const notes = await noteRepository.findAll(userId);
    return notes.map((note) => {
        return {
            id: note.id,
            title: note.title,
            text: (0, encryptUtil_1.decrypt)(note.text),
        };
    });
}
async function getNoteById(id, userId) {
    const note = await noteRepository.findById(id);
    if (!note) {
        throw new customErrorModel_1.CustomError(`Nota Segura não existe!`, 404, `Essa nota não existe`);
    }
    if (note?.userId !== userId) {
        throw new customErrorModel_1.CustomError(`Nota Segura não pertence ao usuário!`, 406, `Nota não pertence ao usuário`);
    }
    const decryptText = (0, encryptUtil_1.decrypt)(note.text);
    return { ...note, text: decryptText };
}
async function deleteNote(id, userId) {
    const note = await noteRepository.findById(id);
    if (!note) {
        throw new customErrorModel_1.CustomError(`Nota Segura não existe!`, 404, `Essa nota não existe`);
    }
    if (note?.userId !== userId) {
        throw new customErrorModel_1.CustomError(`Nota Segura não pertence ao usuário!`, 406, `Nota não pertence ao usuário`);
    }
    await noteRepository.deleteNote(id);
}
