import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import {
  AuthServiceHandler,
  UserServiceHandler,
} from '@nx-microservices/microservice-handler';
import { HashingService } from '@nx-microservices/microservice-services';
import { Prisma } from '@prisma/client';
import { Observable, of } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly hashingService: HashingService,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy
  ) {}

  @MessagePattern(AuthServiceHandler.LOGIN)
  login(body: {
    email?: string;
    username?: string;
    password: string;
  }): Observable<IUserDTO> {
    if (body.email || body.username) {
      return new Observable<IUserDTO>((observer) => {
        this.userService
          .send(UserServiceHandler.GET_USER_UNIQUE, {
            username: body.username,
            email: body.email,
          } as Prisma.UserWhereUniqueInput)
          .subscribe((userDto) => {
            if (userDto && userDto.user.id) {
              this.hashingService
                .compare(body.password, userDto.user.password)
                .subscribe((result) => {
                  if (result) {
                    observer.next(userDto);
                    observer.complete();
                  } else {
                    observer.next({
                      error: {
                        code: HttpStatus.UNAUTHORIZED,
                        message: 'Invalid Password',
                      },
                    });
                    observer.complete();
                  }
                });
            } else {
              observer.next(userDto);
              observer.complete();
            }
          });
      });
    } else {
      return new Observable<IUserDTO>((observer) => {
        observer.next({
          user: {},
          error: {
            code: HttpStatus.BAD_REQUEST,
            message: 'Missing Parameter',
          },
        } as IUserDTO);
        observer.complete();
      });
    }
  }

  @MessagePattern(AuthServiceHandler.REGISTER)
  register(body: Prisma.UserCreateInput): Observable<IUserDTO> {
    // TODO: Throw Error on bad input
    if (body.email && body.username && body.password) {
      return this.userService.send(UserServiceHandler.CREATE_USER, body);
    }
    return of({
      error: { code: HttpStatus.BAD_REQUEST, message: 'Missing Parameter' },
      user: {},
    } as IUserDTO);
  }
}
