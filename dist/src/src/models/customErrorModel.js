"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status = 500, additionalInfo = {}) {
        super(message); // passa a mensagem para o Error
        this.status = status;
        this.additionalInfo = additionalInfo;
        Object.setPrototypeOf(this, CustomError.prototype); // ajuste importante no TS
        this.name = "CustomError"; // aparece no stack trace
    }
}
exports.CustomError = CustomError;
