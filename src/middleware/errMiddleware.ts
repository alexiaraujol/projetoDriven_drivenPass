
export type ErrorType = 
    | "error_bad_request"
    | "error_unauthorized"
    | "error_forbidden"
    | "error_not_found"
    | "error_conflict"
    | "error_unprocessable_entity"
    | "error_internal_server_error";


    
export class ErrorInfo {
  type: ErrorType;
  message: string;
  constructor(errorType: ErrorType, message: string){
    this.type = errorType;
    this.message = message;
  }
}