import { Request, Response } from "express";
import * as eraseService from "../services/eraseService";

export async function eraseAllUsers(req: Request, res: Response) {
    try {
        await eraseService.eraseAllUsers();
        res.status(200).send("Todos os usuários foram excluídos.");
    } catch (error) {
        res.status(500).send("Erro ao excluir usuários.");
    }
}