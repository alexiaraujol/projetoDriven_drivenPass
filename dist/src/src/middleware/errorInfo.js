"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInfo = void 0;
class ErrorInfo {
    constructor(errorType, message) {
        this.type = errorType;
        this.message = message;
    }
    toString() {
        return `${this.type}: ${this.message}`;
    }
}
exports.ErrorInfo = ErrorInfo;
