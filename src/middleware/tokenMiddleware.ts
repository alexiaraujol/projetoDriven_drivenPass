import { NextFunction, Request, Response } from "express";
import { ErrorInfo } from "./errorInfo";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config();

interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

export async function authenticateToken (req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token : string | undefined = authorization?.replace('Bearer ', '');
    if(!token) throw new ErrorInfo("error_unauthorized", "This request doesn't have any token");
    jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!, (err, id) => {
        if(err) throw new ErrorInfo("error_unauthorized", "This request doesn't have a valid token");
        const payload = id as TokenPayload; 
        res.locals.userId = payload.userId;
        next();
    });
};