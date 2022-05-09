import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import { UserServiceHandler } from '@nx-microservices/microservice-handler';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  @Get()
  public getUsers(): Observable<IUserDTO> {
    return this.userService.send(UserServiceHandler.GET_USERS, '');
  }

  @Get(':id')
  public getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<IUserDTO> {
    return this.userService.send(UserServiceHandler.GET_USER_UNIQUE, {
      id: id,
    } as Prisma.UserWhereUniqueInput);
  }

  @Post()
  public createUser(
    @Body() body: Prisma.UserCreateInput
  ): Observable<IUserDTO> {
    return this.userService.send(UserServiceHandler.CREATE_USER, body);
  }

  @Put(':id')
  public updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() body: Prisma.UserUpdateInput
  ): Observable<IUserDTO> {
    return this.userService.send(UserServiceHandler.UPDATE_USER, {
      id,
      user: body,
    });
  }

  @Delete(':id')
  public deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<IUserDTO> {
    return this.userService.send(UserServiceHandler.DELETE_USER, id);
  }
}
