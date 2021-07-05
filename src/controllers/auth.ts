import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Post,
} from '@nestjs/common';

import { AuthService } from '../services/auth';
import { AUTH_ERRORS } from '../constants/errors';

type LoginDto = {
  login: string;
  password: string;
};

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async logIn(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const { login, password } = loginDto;
    if (!login || !password) {
      throw new BadRequestException({ message: AUTH_ERRORS.HTTP_400 });
    }

    const token = await this.authService.logIn({ login, password });
    if (!token) {
      throw new ForbiddenException({ message: AUTH_ERRORS.HTTP_403 });
    }

    return { token };
  }
}
