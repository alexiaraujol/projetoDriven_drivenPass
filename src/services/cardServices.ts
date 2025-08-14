import { Card } from "@prisma/client";
import * as cardRepository from '../repositories/cardRepository'
import { ICard, ICardNoUserId } from "../interfaces/cardInterface";
import { CustomError } from "../models/customErrorModel";
import { decrypt, encrypt } from "../utils/encryptUtil";

export async function newCard(card: ICardNoUserId, userId: number) {
    const duplicateTitle = await cardRepository.findByUserIdandTittle(userId, card.title);

    if (duplicateTitle) {
        throw new CustomError(
            `Título Duplicado`,
            409,
            `Imagina achar o Sr. Meeseeks se todos tem o mesmo nome...`
        );
    }

    const encryptPassword: string = await encrypt(card.CardPassword);
    const encryptCVV: string = await encrypt(card.CardCVV);

    await cardRepository.insert(card, userId, encryptPassword, encryptCVV);
}

export async function allCards(userId: number): Promise<ICard[]> {
    const cards: Card[] = await cardRepository.findById(userId);

    return cards.map((card: ICard) => {
        delete card?.createdAt
        return {
            ...card, CardCVV: decrypt(card.CardCVV), CardPassword: decrypt(card.CardPassword)
        }
    })
}

export async function getCardById(id: number, userId: number): Promise<Card> {
    const cardArray = await cardRepository.findById(id);
    const card = cardArray[0]

    if (!card) {
        throw new CustomError(
            `Cartão não existe!`,
            404,
            `Esse cartão não existe`
        );
    }

    if (card?.userId !== userId) {
        throw new CustomError(
            `Cartão não pertence ao usuário!`,
            406,
            `O cartão não pertence ao usuário`
        );
    }

    return { ...card, CardPassword: decrypt(card.CardPassword), CardCVV: decrypt(card.CardCVV) as string }
}

export async function deleteCard(id: number, userId: number) {
    const cards = await cardRepository.findById(id);

    if (!cards) {
        throw new CustomError(
            `Cartão não existe!`,
            404,
            `Esse cartão não existe`
        );
    }

    const card = cards[0];
    
    if (card.userId !== userId) {
        throw new CustomError(
            `Cartão não pertence ao usuário!`,
            406,
            `O cartão não pertence ao usuário`
        );
    }

    await cardRepository.deleteCard(id);
}