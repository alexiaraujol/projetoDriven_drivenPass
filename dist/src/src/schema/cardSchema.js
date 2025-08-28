"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCard = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerCard = joi_1.default.object({
    title: joi_1.default.string().min(1).max(50).required(),
    cardNumber: joi_1.default.string().min(1).required(),
    cardName: joi_1.default.string().min(1).required(),
    CardCVV: joi_1.default.string().min(1).required(),
    CardExpiration: joi_1.default.string().min(4).max(7).required(),
    CardPassword: joi_1.default.string().min(4).max(6).required(),
    isVirtual: joi_1.default.boolean().strict().required(),
    type: joi_1.default.string().valid('credit', 'debit', 'both').required()
});
