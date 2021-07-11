import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserService } from '../services/user';
import { USER_ERRORS } from '../constants/errors';

@Injectable()
export class CheckUserExistInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<void>> {
    const ctx = context.switchToHttp();
    const req: Request = ctx.getRequest();

    const { login } = req.body;
    const existingUser = await this.userService.getByUsername(login);

    if (existingUser) {
      throw new BadRequestException({ message: USER_ERRORS.HTTP_400(login) });
    }

    return next.handle();
  }
}
