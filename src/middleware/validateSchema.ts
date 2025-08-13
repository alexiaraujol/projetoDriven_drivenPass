import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errMiddleware";

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw new ErrorInfo("error_unprocessable_entity", error.message);
    }

    next();
  };
}
