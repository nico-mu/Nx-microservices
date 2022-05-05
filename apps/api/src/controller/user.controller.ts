import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserDTO } from '@nx-microservices/api-interfaces';
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
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<UserDTO> {
    return this.userService.user({ id });
  }

  @Post()
  create(@Body() body: Prisma.UserCreateInput): Observable<UserDTO> {
    return this.userService.createUser(body);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<UserDTO> {
    return this.userService.deleteUser({ id });
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() body: Prisma.UserUpdateInput
  ): Observable<UserDTO> {
    return this.userService.updateUser({
      where: { id },
      data: body,
    });
  }
}
