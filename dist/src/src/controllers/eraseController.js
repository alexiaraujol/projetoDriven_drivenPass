"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseUsers = eraseUsers;
const eraseService_1 = require("../services/eraseService");
async function eraseUsers(req, res) {
    try {
        const userId = Number(req.params.id);
        await (0, eraseService_1.eraseUserByIdService)(userId);
        res.status(200).send("Usuario foi excluido!! ");
    }
    catch (error) {
        res.status(500).send(error);
    }
}
