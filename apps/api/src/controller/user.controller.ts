import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.userService.users({ orderBy: { id: 'desc' } });
  }

  @Get(':id')
  async findOne(@Param() params: { id: number }): Promise<UserModel> {
    return this.userService.user({ id: params.id });
  }

  @Post()
  async create(@Body() body: Prisma.UserCreateInput): Promise<UserModel> {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<UserModel> {
    return this.userService.deleteUser({ id: params.id });
  }

  @Put(':id')
  async update(
    @Param() params: { id: number },
    @Body() body: Prisma.UserUpdateInput
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: params.id },
      data: body,
    });
  }
}
