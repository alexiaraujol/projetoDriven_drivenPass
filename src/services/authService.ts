import jwt from "jsonwebtoken";
import { CustomError } from "../models/customErrorModel";
import * as userRepositorie from "../repositories/authRepositorie";
import * as encryptUtil from '../utils/encryptUtil'


export async function createNewUser(name: string, email: string, password: string) {

    const registered = await isRegistered(email)

   

    if (registered) {
        throw new CustomError(
            `Usuário já cadastrado`,
            409,
            `Cadastre um novo email. `
        );
    }

    if (name === '') {

        throw new CustomError(
            `Nome inválido`,
            400,
            `Cadastre um nome válido`
        );

    }

     const hashPassword: string = await encryptUtil.hashPassword(password)

    await userRepositorie.create(name, email, hashPassword);


}


export async function login(email: string, password: string) {

    
    const registeredUser = await isRegistered(email);

    if(!registeredUser) {
        throw new CustomError(
            `Usuário não encontrado!`, 
            404, 
            `Verifique se você errou o login ou a senha!!`
            );
    }

    const valid = await encryptUtil.checkPassword(password, registeredUser.password);

    if(valid) {
        return jwt.sign({userId: registeredUser.id}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '60m'});
    } else {
        throw new CustomError(
            `Usuário não encontrado!`, 
            404, 
            `Verifique se você errou o login ou a senha!! `
            );
    }
    


}

async function isRegistered(email: string) {

    const register = await userRepositorie.findByEmail(email)

    if (register) return register;

    return false;

}
