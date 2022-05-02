import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserDTO } from '@swipper/api-interfaces';
import { Observable, of } from 'rxjs';
import { HashingService } from '../services/hashing.service';
import { UserService } from '../services/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  login(
    @Body() body: { email?: string; name?: string; password_hash: string }
  ): Observable<UserDTO> {
    return new Observable<UserDTO>((observer) => {
      this.userService
        .user({
          email: body.email,
          name: body.name,
        })
        .subscribe((userDTO) => {
          if (userDTO) {
            this.hashingService
              .compare(body.password_hash, userDTO.user.password_hash)
              .subscribe((result) => {
                if (result) {
                  observer.next(userDTO);
                  observer.complete();
                } else {
                  observer.next({
                    error: {
                      code: 401,
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
  }

  @Post('register')
  register(@Body() body: Prisma.UserCreateInput): Observable<UserDTO> {
    // TODO: Throw Error on bad input
    if (body.email && body.name && body.password_hash) {
      return this.userService.createUser(body);
    }
    return of({
      error: { code: 422, message: 'Missing Parameter' },
    } as UserDTO);
  }
}
