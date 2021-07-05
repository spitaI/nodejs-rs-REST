import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { getAuthorizationToken, verifySignedJWTToken } from '../utils/auth';
import { AUTH_ERRORS } from '../constants/errors';

@Injectable()
export class VerifyAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const token = getAuthorizationToken(req.headers.authorization);
    if (!token || !verifySignedJWTToken(token)) {
      throw new UnauthorizedException({ message: AUTH_ERRORS.HTTP_401 });
    }

    return true;
  }
}
