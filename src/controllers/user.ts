import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { IUser, UserResponse } from '../models/user';
import { UserService } from '../services/user';
import { CheckUserExistInterceptor } from '../interceptors/checkUserExistInterceptor';
import { getValidationInterceptor } from '../interceptors/validationInterceptor';
import { USER_SCHEMA } from '../constants/validation';
import { USER_ERRORS } from '../constants/errors';

const UserValidationInterceptor = getValidationInterceptor(USER_SCHEMA);

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<UserResponse[]> {
    return this.userService.getAll();
  }

  @Post()
  @UseInterceptors(CheckUserExistInterceptor)
  @UseInterceptors(UserValidationInterceptor)
  async create(@Body() user: IUser): Promise<UserResponse | null> {
    const newUser = await this.userService.create(user);

    if (!newUser) {
      throw new InternalServerErrorException({ message: USER_ERRORS.HTTP_500 });
    }

    return newUser;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserResponse | null> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundException({ message: USER_ERRORS.HTTP_404(id) });
    }

    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<IUser>
  ): Promise<UserResponse | null> {
    const updatedUser = await this.userService.updateById(id, userData);

    if (!updatedUser) {
      throw new NotFoundException({ message: USER_ERRORS.HTTP_404(id) });
    }

    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    const isUserDeleted = await this.userService.deleteById(id);

    if (!isUserDeleted) {
      throw new NotFoundException({ message: USER_ERRORS.HTTP_404(id) });
    }

    return isUserDeleted;
  }
}
