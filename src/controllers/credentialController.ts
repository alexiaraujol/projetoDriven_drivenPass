import { Request, Response } from "express";
import * as credentialService from '../services/credentialService'

export async function createCredential(req: Request, res: Response) {
    const { url, title, username, password } = req.body;
    const { userId } = res.locals

    await credentialService.newCredential(url, title, username, password, userId)
    res.sendStatus(200)
}
export async function getAllCredential(req: Request, res: Response) {
    const {userId} = res.locals;
    const credentials = await credentialService.allCredential(userId.userId)
    
    res.status(200).send(credentials)
}


export async function specificCredentials(req: Request, res: Response) {
    const { userId } = res.locals;
    const { id } = req.params;

    const credential = await credentialService.getCredentialById(parseInt(id), userId.userId);

    res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const { userId } = res.locals;
    const { id } = req.params;

    await credentialService.deleteCredential(parseInt(id), userId.userId);

    res.sendStatus(202);
}