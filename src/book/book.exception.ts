import { HttpException, HttpStatus } from '@nestjs/common';

export class BookException extends HttpException {
  constructor() {
    super('this is my custom BookException', HttpStatus.BAD_REQUEST);
  }
}
