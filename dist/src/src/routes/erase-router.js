"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eraseController_1 = require("../controllers/eraseController");
const tokenMiddleware_1 = require("../middleware/tokenMiddleware");
const eraseRouter = (0, express_1.Router)();
eraseRouter.delete("/user/:id", tokenMiddleware_1.authenticateToken, eraseController_1.eraseUsers);
exports.default = eraseRouter;
