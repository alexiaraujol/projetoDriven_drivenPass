import { Request, Response } from 'express';
import * as userService from '../services/authService';
import { ISignIn, ISignUp } from '../interfaces/userInterface';


export async function signUp(req: Request, res: Response) {
    const { name, email, password }: ISignUp = req.body;
    
    await userService.createNewUser(name, email, password);
    
    res.sendStatus(201);
    }
    
    export async function signIn(req: Request, res: Response) {
        const { email, password }: ISignIn = req.body;
    
        const response = await userService.login(email, password);
    
        res.status(202).send(response);
    }
