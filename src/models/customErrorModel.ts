export class CustomError extends Error {
  status: number;
  additionalInfo: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    super(message); // passa a mensagem para o Error
    this.status = status;
    this.additionalInfo = additionalInfo;

    Object.setPrototypeOf(this, CustomError.prototype); // ajuste importante no TS
    this.name = "CustomError"; // aparece no stack trace
  }
}
