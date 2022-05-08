import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import { Prisma, User } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { PrismaService } from '../database/prisma.service';
import { HashingService } from '../util/services/hashing.service';

@Injectable()
export class UserService {
  private static logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService, private hashing: HashingService) {}

  user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Observable<IUserDTO> {
    return new Observable<IUserDTO>((observer) => {
      this.prisma.user
        .findUnique({
          where: userWhereUniqueInput,
        })
        .then((user) => {
          if (user) {
            observer.next({ user: user, error: {} } as IUserDTO);
          } else {
            observer.next({
              user: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IUserDTO);
          }
          observer.complete();
        })
        .catch(() => {
          observer.next({
            user: {},
            error: {
              code: HttpStatus.NOT_FOUND,
              message: 'The requested resource was not found.',
            },
          } as IUserDTO);
          observer.complete();
        });
    });
  }

  users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Observable<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return from(
      this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
    );
  }

  createUser(data: Prisma.UserCreateInput): Observable<IUserDTO> {
    return new Observable<IUserDTO>((observer) => {
      this.hashing.hash(data.password as string).subscribe((hash) => {
        data.password = hash;
        this.prisma.user
          .create({
            data,
          })
          .then((user) => {
            if (user) {
              observer.next({ user: user, error: {} } as IUserDTO);
            } else {
              observer.next({
                user: {},
                error: {
                  code: HttpStatus.NOT_FOUND,
                  message: 'The requested resource was not found.',
                },
              } as IUserDTO);
            }
            observer.complete();
          })
          .catch(() => {
            observer.next({
              user: {},
              error: {
                code: HttpStatus.UNPROCESSABLE_ENTITY,
                message: 'User already exists',
              },
            } as IUserDTO);
            observer.complete();
          });
      });
    });
  }

  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Observable<IUserDTO> {
    const { where, data } = params;
    return new Observable<IUserDTO>((observer) => {
      if (data && data.password) {
        this.hashing.hash(data.password as string).subscribe((hash) => {
          data.password = hash;
          this.prisma.user
            .update({
              data,
              where,
            })
            .then((user) => {
              if (user) {
                observer.next({ user: user, error: {} } as IUserDTO);
              } else {
                observer.next({
                  user: {},
                  error: {
                    code: HttpStatus.NOT_FOUND,
                    message: 'The requested resource was not found.',
                  },
                } as IUserDTO);
              }
              observer.complete();
            })
            .catch(() => {
              observer.next({
                user: {},
                error: {
                  code: HttpStatus.NOT_FOUND,
                  message: 'The requested resource was not found.',
                },
              } as IUserDTO);
              observer.complete();
            });
        });
      } else {
        this.prisma.user
          .update({
            data,
            where,
          })
          .then((user) => {
            if (user) {
              observer.next({ user: user, error: {} } as IUserDTO);
            } else {
              observer.next({
                user: {},
                error: {
                  code: HttpStatus.NOT_FOUND,
                  message: 'The requested resource was not found.',
                },
              } as IUserDTO);
            }
            observer.complete();
          })
          .catch(() => {
            observer.next({
              user: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IUserDTO);
            observer.complete();
          });
      }
    });
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Observable<IUserDTO> {
    return new Observable<IUserDTO>((observer) => {
      this.prisma.user
        .delete({
          where,
        })
        .then((user) => {
          if (user) {
            observer.next({ user: user, error: {} } as IUserDTO);
          } else {
            observer.next({
              user: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IUserDTO);
          }
          observer.complete();
        })
        .catch(() => {
          observer.next({
            user: {},
            error: {
              code: HttpStatus.NOT_FOUND,
              message: 'The requested resource was not found.',
            },
          } as IUserDTO);
          observer.complete();
        });
    });
  }
}
