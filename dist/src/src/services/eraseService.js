"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseUserByIdService = eraseUserByIdService;
const eraseRepositorie_1 = require("../repositories/eraseRepositorie");
async function eraseUserByIdService(userId) {
    await (0, eraseRepositorie_1.deleteUserById)(userId);
}
