import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class BookGuard implements CanActivate {
  public name = 'Linh';
  public password = '1234567';

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    if (
      req.header('name') === undefined ||
      req.header('password') === undefined
    )
      return false;
    return (
      req.header('name') === this.name &&
      req.header('password') === this.password
    );
  }
}
