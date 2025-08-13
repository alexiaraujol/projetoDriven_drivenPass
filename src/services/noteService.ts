
import * as noteRepository from '../repositories/notesRepository';

import { CustomError } from '../models/customErrorModel';

import { decrypt, encrypt } from '../utils/encryptUtil';

import { SafeNote } from '@prisma/client';


export async function newNote(title: string, text: string, userId: number) {
    const duplicateTitle = await noteRepository.findByUserIdAndTitle(userId, title);

    if(duplicateTitle) {
        throw new CustomError(
            `Título Duplicado`, 
            409, 
            `Seu titulo esta duplicado`
            );
    }

    const encryptText = await encrypt(text);

    await noteRepository.insert(title, encryptText, userId);
}

export async function allNotes(userId: number) {
    const notes = await noteRepository.findAll(userId);

    return notes.map( (note) => {
        return {
            id: note.id,
            title: note.title,
            text: decrypt(note.text),
        }
    })
}

export async function getNoteById(id: number, userId: number): Promise<SafeNote> {
    const note = await noteRepository.findById(id);

    if(!note) {
        throw new CustomError(
            `Nota Segura não existe!`, 
            404, 
            `Essa nota não existe`
            );
    }

    if(note?.userId !== userId) {
        throw new CustomError(
            `Nota Segura não pertence ao usuário!`, 
            406, 
            `Nota não pertence ao usuário`
            );
    }

    const decryptText: string = decrypt(note.text);

    return { ...note, text: decryptText }
}

export async function deleteNote(id: number, userId: number) {
    const note = await noteRepository.findById(id);

    if(!note) {
        throw new CustomError(
            `Nota Segura não existe!`, 
            404, 
            `Essa nota não existe`
            );
    }

    if(note?.userId !== userId) {
        throw new CustomError(
            `Nota Segura não pertence ao usuário!`, 
            406, 
            `Nota não pertence ao usuário`
            );
    }

    await noteRepository.deleteNote(id);
}