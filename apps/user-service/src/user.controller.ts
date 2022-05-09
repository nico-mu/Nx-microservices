import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import { UserServiceHandler } from '@nx-microservices/microservice-handler';
import { Prisma, User as UserModel } from '@prisma/client';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern(UserServiceHandler.GET_USERS)
  findAll(): Observable<UserModel[]> {
    return this.userService.users({ orderBy: { id: 'desc' } });
  }

  @MessagePattern(UserServiceHandler.GET_USER_UNIQUE)
  findOne(params: Prisma.UserWhereUniqueInput): Observable<IUserDTO> {
    return this.userService.user(params);
  }

  @MessagePattern(UserServiceHandler.CREATE_USER)
  create(params: Prisma.UserCreateInput): Observable<IUserDTO> {
    return this.userService.createUser(params);
  }

  @MessagePattern(UserServiceHandler.DELETE_USER)
  delete(id: number): Observable<IUserDTO> {
    return this.userService.deleteUser({ id });
  }

  @MessagePattern(UserServiceHandler.UPDATE_USER)
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
