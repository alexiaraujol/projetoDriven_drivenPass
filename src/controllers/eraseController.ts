import { Request, Response } from "express";
import { eraseUserByIdService } from "../services/eraseService";

export async function eraseUsers(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id)
        await eraseUserByIdService(userId);
        res.status(200).send("Usuario foi excluido!! ");
    } catch (error) {
        res.status(500).send(error);
    }
}