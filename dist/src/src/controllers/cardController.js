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
exports.createCard = createCard;
exports.getAllCards = getAllCards;
exports.specificCard = specificCard;
exports.deleteCard = deleteCard;
const cardService = __importStar(require("../services/cardServices"));
async function createCard(req, res) {
    const card = req.body;
    const { userId } = res.locals;
    await cardService.newCard(card, userId.userId);
    res.sendStatus(202);
}
async function getAllCards(_req, res) {
    const { userId } = res.locals;
    const cards = await cardService.allCards(userId.userId);
    res.status(200).send(cards);
}
async function specificCard(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    const card = await cardService.getCardById(parseInt(id), userId.userId);
    res.status(200).send(card);
}
async function deleteCard(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    await cardService.deleteCard(parseInt(id), userId.userId);
    res.sendStatus(202);
}
