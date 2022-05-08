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
import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
} from '@nx-microservices/microservice-handler';
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
    return this.userService.send(GET_USER, '');
  }

  @Get(':id')
  public getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<IUserDTO> {
    return this.userService.send(GET_USER_BY_ID, id);
  }

  @Post()
  public createUser(
    @Body() body: Prisma.UserCreateInput
  ): Observable<IUserDTO> {
    return this.userService.send(CREATE_USER, body);
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
    return this.userService.send(UPDATE_USER, { id, user: body });
  }

  @Delete(':id')
  public deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<IUserDTO> {
    return this.userService.send(DELETE_USER, id);
  }
}
