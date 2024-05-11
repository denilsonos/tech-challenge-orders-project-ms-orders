export class Exception extends Error {
  constructor(
    public statusCode: number,
    public body: BodyException,
  ) {
    super(body.message)
  }
}
class BodyException {
  constructor(public message: string, public issues?: any[]) { }
}

export class NotFoundException extends Exception {
  private static statusCode = 404;
  constructor(message: string = 'Not Found') {
    super(NotFoundException.statusCode, { message });
  }
}

export class BadRequestException extends Exception {
  private static statusCode = 400;
  constructor(message: string = 'Bad Request', issues?: any[]) {
    super(BadRequestException.statusCode, { message, issues });
  }
}

export class ConflictException extends Exception {
  private static statusCode = 409;
  constructor(message: string = 'Bad Request', issues?: any[]) {
    super(ConflictException.statusCode, { message, issues })
  }
}