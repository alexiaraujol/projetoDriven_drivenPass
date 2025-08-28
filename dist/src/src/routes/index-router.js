"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user-router"));
const credentials_router_1 = __importDefault(require("./credentials-router"));
const note_router_1 = __importDefault(require("./note-router"));
const card_router_1 = __importDefault(require("./card-router"));
const erase_router_1 = __importDefault(require("./erase-router"));
const router = (0, express_1.Router)();
router.use("/user", user_router_1.default);
router.use("/credentials", credentials_router_1.default);
router.use("/safenote", note_router_1.default);
router.use("/card", card_router_1.default);
router.use("/admin", erase_router_1.default);
exports.default = router;
