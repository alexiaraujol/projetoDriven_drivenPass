import { Request, Response, NextFunction } from "express";
import { ErrorInfo } from "./errorInfo";


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ErrorInfo) {
    return res.status(mapErrorToStatus(err.type)).json({
      error: err.type,
      message: err.message
    });
  }

  return res.status(500).json({
    error: "error_internal_server_error",
    message: "Ocorreu um erro inesperado"
  });
}

function mapErrorToStatus(type: string): number {
  switch (type) {
    case "error_bad_request":
      return 400;
    case "error_unauthorized":
      return 401;
    case "error_forbidden":
      return 403;
    case "error_not_found":
      return 404;
    case "error_conflict":
      return 409;
    case "error_unprocessable_entity":
      return 422;
    default:
      return 500;
  }
}
