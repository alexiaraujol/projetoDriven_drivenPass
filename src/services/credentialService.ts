import { CustomError } from "../models/customErrorModel";
import * as credentialRepository from "../repositories/credentialRepository"
import { decrypt, encrypt } from "../utils/encryptUtil";

export async function newCredential(url: string, title: string, username: string, password: string, userId: number) {
    const duplicateTitle = await credentialRepository.findByUserIdAndTitle(userId, title);

    if(duplicateTitle) {
        throw new CustomError(
            `Título Duplicado`, 
            409, 
            `O título esta duplicado!! `
            );
    }

    const encryptPassword = await encrypt(password);

    await credentialRepository.insert(url, title, username, encryptPassword, userId);
}

export async function allCredential(userId: number) {
    const credentials = await credentialRepository.findAll(userId);

    return credentials.map( (credential) => {
        return {
            id: credential.id,
            url: credential.url,
            title: credential.title,
            login: credential.username,
            password: decrypt(credential.password),
        }
    })
}

export async function getCredentialById(id: number, userId: number) {
    const credential = await credentialRepository.findById(id);

    if(!credential) {
        throw new CustomError(
            `Credencial não existe!`, 
            404, 
            `Essa Credencial não existe!!`
            );
    }

    if(credential?.userId !== userId) {
        throw new CustomError(
            `Credencial não pertence ao usuário!`, 
            406, 
            `Essa credencial pertence não pertence ao usuário!!`
            );
    }

    const decryptPassword = decrypt(credential.password);

    return { ...credential, password: decryptPassword }
}

export async function deleteCredential(id: number, userId: number) {
    const credential = await credentialRepository.findById(id);

    if(!credential) {
        throw new CustomError(
            `Credencial não existe!`, 
            404, 
            `Essa Credencial não existe!!`
            );
    }

    if(credential?.userId !== userId) {
        throw new CustomError(
            `Credencial não pertence ao usuário!`, 
            406, 
            `Essa credencial pertence não pertence ao usuário!! `
            );
    }

    await credentialRepository.deleteCredential(id);
}