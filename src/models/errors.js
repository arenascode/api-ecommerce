/** Example of use  */
// try {
//   throw new CustomError("Something went wrong", "INTERNAL_ERROR", {
//     module: "database",
//   });
// } catch (error) {
//   if (error instanceof CustomError) {
//     error.logError();
//   }
// }

export class validationError extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = "Validation Error";
    this.code = code;
    this.details = details;
    this.timestamp = Date().toString();
    this.trackrace = this.captureStackTrace();
  }

  captureStackTrace() {
    const stack = new Error().stack;
    return stack.split("\n").slice(3).join("\n");
  }

  logError() {
    console.error(`[${this.timestamp}] [${this.name}]`);
    console.error(`[${this.message}]`);
    console.error(`[${this.details}]`);
    console.error(`Stack Trace: ${this.trackrace}`);
  }
}

export class AuthenticationError extends Error {
  constructor(message, code, details) {
    super(message)
    this.name = "AuthenticationError"
    this.code = code,
    this.details = details,
    this.timestamp = new Date().toDateString()
    this.stackTrace = this.captureStackTrace()
  }

  captureStackTrace() {
    const stack = new Error().stack
    return stack.split('\n')
      .splice(3)
      .join("")
  }

  LogError() {
    console.error(`Message: [${this.message}] Code: [${this.name}]`)
    console.error(`Details: [${this.details}]`)
    console.error(`Stack Trace: [${this.stackTrace}]`)
  }
}
export class ErrorNotFound extends Error {
  constructor(message, details) {
    super(message);
    this.name = "Resource Not Found";
    this.details = details;
    this.timestamp = new Date().toLocaleTimeString()
    this.stackTrace = this.captureTrackTrace();
  }

  captureTrackTrace() {
    const stack = new Error().stack;
    return stack.split("\n").splice(3).join("\n");
  }

  logError() {
    console.error(`[${this.timestamp}] [Error Name: ${this.name} - Message:[${this.message}] - Details: [${this.details}]`);
    console.error(`Stack Trace: ${this.stackTrace}`);
  }
}

export class ConnectionDBFailed extends Error{
  constructor(message, code, details) {
    super(message);
    this.name = "mongoDbConnection";
    this.code = code;
    this.details = details;
    this.trackrace = this.captureStackTrace();
  }

  captureStackTrace() {
    stack = new Error().stack;
    return stack.split("\n").splice(3).join("\n");
  }

  logError() {
    console.error(`[${this.name}] [${this.code}]`);
    console.error(`[${this.details}]`);
    console.error(`Stack Trace: ${this.trackrace}`);
  }
}


