import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserDTO } from '@nx-microservices/api-interfaces';
import { Observable, of } from 'rxjs';
import { HashingService } from '../util/services/hashing.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  login(
    @Body() body: { email?: string; name?: string; password: string }
  ): Observable<UserDTO> {
    if (body.email || body.name) {
      return new Observable<UserDTO>((observer) => {
        this.userService
          .user({
            email: body.email,
            username: body.name,
          })
          .subscribe((userDTO) => {
            if (userDTO) {
              this.hashingService
                .compare(body.password, userDTO.user.password)
                .subscribe((result) => {
                  if (result) {
                    observer.next(userDTO);
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
              observer.error('User not found');
            }
          });
      });
    } else {
      return new Observable<UserDTO>((observer) => {
        observer.next({
          user: {},
          error: {
            code: HttpStatus.BAD_REQUEST,
            message: 'Missing Parameter',
          },
        } as UserDTO);
        observer.complete();
      });
    }
  }

  @Post('register')
  register(@Body() body: Prisma.UserCreateInput): Observable<UserDTO> {
    // TODO: Throw Error on bad input
    if (body.email && body.username && body.password) {
      return this.userService.createUser(body);
    }
    return of({
      error: { code: HttpStatus.BAD_REQUEST, message: 'Missing Parameter' },
      user: {},
    } as UserDTO);
  }
}
