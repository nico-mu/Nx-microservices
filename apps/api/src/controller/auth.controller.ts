import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { Observable } from 'rxjs';
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
  ): Observable<UserModel> {
    return new Observable<UserModel>((observer) => {
      this.userService
        .user({
          email: body.email,
          name: body.name,
        })
        .subscribe((user) => {
          if (user) {
            this.hashingService
              .compare(body.password_hash, user.password_hash)
              .subscribe((result) => {
                if (result) {
                  observer.next(user);
                  observer.complete();
                } else {
                  observer.error('Wrong password');
                }
              });
          } else {
            observer.error('User not found');
          }
        });
    });
  }

  @Post('register')
  register(@Body() body: Prisma.UserCreateInput): Observable<UserModel> {
    // TODO: Throw Error on bad input
    if (body.email && body.name && body.password_hash) {
      return this.userService.createUser(body);
    }
  }
}
