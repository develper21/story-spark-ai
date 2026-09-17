class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string | undefined, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
