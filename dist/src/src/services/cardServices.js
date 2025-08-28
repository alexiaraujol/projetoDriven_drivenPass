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
exports.newCard = newCard;
exports.allCards = allCards;
exports.getCardById = getCardById;
exports.deleteCard = deleteCard;
const cardRepository = __importStar(require("../repositories/cardRepository"));
const customErrorModel_1 = require("../models/customErrorModel");
const encryptUtil_1 = require("../utils/encryptUtil");
async function newCard(card, userId) {
    const duplicateTitle = await cardRepository.findByUserIdandTittle(userId, card.title);
    if (duplicateTitle) {
        throw new customErrorModel_1.CustomError(`Título Duplicado`, 409, `Imagina achar o Sr. Meeseeks se todos tem o mesmo nome...`);
    }
    const encryptPassword = await (0, encryptUtil_1.encrypt)(card.CardPassword);
    const encryptCVV = await (0, encryptUtil_1.encrypt)(card.CardCVV);
    await cardRepository.insert(card, userId, encryptPassword, encryptCVV);
}
async function allCards(userId) {
    const cards = await cardRepository.findById(userId);
    return cards.map((card) => {
        delete card?.createdAt;
        return {
            ...card, CardCVV: (0, encryptUtil_1.decrypt)(card.CardCVV), CardPassword: (0, encryptUtil_1.decrypt)(card.CardPassword)
        };
    });
}
async function getCardById(id, userId) {
    const cardArray = await cardRepository.findById(id);
    const card = cardArray[0];
    if (!card) {
        throw new customErrorModel_1.CustomError(`Cartão não existe!`, 404, `Esse cartão não existe`);
    }
    if (card?.userId !== userId) {
        throw new customErrorModel_1.CustomError(`Cartão não pertence ao usuário!`, 406, `O cartão não pertence ao usuário`);
    }
    return { ...card, CardPassword: (0, encryptUtil_1.decrypt)(card.CardPassword), CardCVV: (0, encryptUtil_1.decrypt)(card.CardCVV) };
}
async function deleteCard(id, userId) {
    const cards = await cardRepository.findById(id);
    if (!cards) {
        throw new customErrorModel_1.CustomError(`Cartão não existe!`, 404, `Esse cartão não existe`);
    }
    const card = cards[0];
    if (card.userId !== userId) {
        throw new customErrorModel_1.CustomError(`Cartão não pertence ao usuário!`, 406, `O cartão não pertence ao usuário`);
    }
    await cardRepository.deleteCard(id);
}
