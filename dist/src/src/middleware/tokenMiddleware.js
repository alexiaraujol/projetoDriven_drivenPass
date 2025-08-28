"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const errorInfo_1 = require("./errorInfo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function authenticateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token)
        throw new errorInfo_1.ErrorInfo("error_unauthorized", "This request doesn't have any token");
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
        if (err)
            throw new errorInfo_1.ErrorInfo("error_unauthorized", "This request doesn't have a valid token");
        const payload = id;
        res.locals.userId = payload.userId;
        next();
    });
}
;
