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
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Observable<UserModel[]> {
    return this.userService.users({ orderBy: { id: 'desc' } });
  }

  @Get(':id')
  findOne(@Param() params: { id: number }): Observable<UserModel> {
    return this.userService.user({ id: params.id });
  }

  @Post()
  create(@Body() body: Prisma.UserCreateInput): Observable<UserModel> {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  delete(@Param() params): Observable<UserModel> {
    return this.userService.deleteUser({ id: params.id });
  }

  @Put(':id')
  update(
    @Param() params: { id: number },
    @Body() body: Prisma.UserUpdateInput
  ): Observable<UserModel> {
    return this.userService.updateUser({
      where: { id: params.id },
      data: body,
    });
  }
}
