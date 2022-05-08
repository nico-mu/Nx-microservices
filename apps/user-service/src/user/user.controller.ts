import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
} from '@nx-microservices/microservice-handler';
import { Prisma, User as UserModel } from '@prisma/client';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern(GET_USER)
  findAll(): Observable<UserModel[]> {
    return this.userService.users({ orderBy: { id: 'desc' } });
  }

  @MessagePattern(GET_USER_BY_ID)
  findOne(id: number): Observable<IUserDTO> {
    return this.userService.user({ id });
  }

  @MessagePattern(CREATE_USER)
  create(params: Prisma.UserCreateInput): Observable<IUserDTO> {
    return this.userService.createUser(params);
  }

  @MessagePattern(DELETE_USER)
  delete(id: number): Observable<IUserDTO> {
    return this.userService.deleteUser({ id });
  }

  @MessagePattern(UPDATE_USER)
  update(req: {
    id: number;
    user: Prisma.UserUpdateInput;
  }): Observable<IUserDTO> {
    return this.userService.updateUser({
      where: { id: req.id },
      data: req.user,
    });
  }
}
