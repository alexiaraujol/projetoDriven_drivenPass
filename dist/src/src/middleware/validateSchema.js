"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
const errorInfo_1 = require("./errorInfo");
function validateSchema(schema) {
    return (req, _res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw new errorInfo_1.ErrorInfo("error_unprocessable_entity", error.message);
        }
        next();
    };
}
