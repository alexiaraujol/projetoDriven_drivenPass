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
exports.createNote = createNote;
exports.getAllNotes = getAllNotes;
exports.specificNote = specificNote;
exports.deleteNote = deleteNote;
const noteService = __importStar(require("../services/noteService"));
async function createNote(req, res) {
    const { title, text } = req.body;
    const { userId } = res.locals;
    await noteService.newNote(title, text, userId.userId);
    res.sendStatus(202);
}
async function getAllNotes(req, res) {
    const { userId } = res.locals;
    const notes = await noteService.allNotes(userId.userId);
    res.status(200).send(notes);
}
async function specificNote(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    const note = await noteService.getNoteById(parseInt(id), userId.userId);
    res.status(200).send(note);
}
async function deleteNote(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    await noteService.deleteNote(parseInt(id), userId.userId);
    res.sendStatus(202);
}
