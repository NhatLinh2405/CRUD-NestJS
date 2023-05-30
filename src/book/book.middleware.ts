import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BookMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const protocol = req.protocol;
    const host = req.get('host');
    const originalUrl = req.originalUrl;
    const method = req.method;
    const date = new Date().toDateString();
    console.log(`${date} ${method} ${protocol}://${host}${originalUrl}`);
    next();
  }
}
