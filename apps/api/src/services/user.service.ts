import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserDTO } from '@swipper/api-interfaces';
import { from, Observable } from 'rxjs';
import { HashingService } from './hashing.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  private static logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService, private hashing: HashingService) {}

  user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Observable<UserDTO> {
    return new Observable<UserDTO>((observer) => {
      this.prisma.user
        .findUnique({
          where: userWhereUniqueInput,
        })
        .then((user) => {
          observer.next({ user: user });
          observer.complete();
        })
        .catch(() => {
          observer.error({
            error: {
              code: 404,
              message: 'The requested resource was not found.',
            },
          });
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

  createUser(data: Prisma.UserCreateInput): Observable<UserDTO> {
    return new Observable<UserDTO>((observer) => {
      this.hashing.hash(data.password_hash as string).subscribe((hash) => {
        data.password_hash = hash;
        this.prisma.user
          .create({
            data,
          })
          .then((user) => {
            observer.next({ error: {}, user } as UserDTO);
            observer.complete();
          })
          .catch(() => {
            observer.next({
              error: { code: 422, message: 'User already exists' },
            } as UserDTO);
            observer.complete();
          });
      });
    });
  }

  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Observable<UserDTO> {
    const { where, data } = params;
    return new Observable<UserDTO>((observer) => {
      if (data.password_hash) {
        this.hashing.hash(data.password_hash as string).subscribe((hash) => {
          data.password_hash = hash;
          this.prisma.user
            .update({
              data,
              where,
            })
            .then((user) => {
              observer.next({ user: user });
              observer.complete();
            })
            .catch(() => {
              observer.error({
                error: {
                  code: 404,
                  message: 'The requested resource was not found.',
                },
              });
            });
        });
      } else {
        this.prisma.user
          .update({
            data,
            where,
          })
          .then((user) => {
            observer.next({ user: user });
            observer.complete();
          })
          .catch(() => {
            observer.error({
              error: {
                code: 404,
                message: 'The requested resource was not found.',
              },
            });
          });
      }
    });
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Observable<UserDTO> {
    return new Observable<UserDTO>((observer) => {
      this.prisma.user
        .delete({
          where,
        })
        .then((user) => {
          observer.next({ user: user });
          observer.complete();
        })
        .catch(() => {
          observer.error({
            error: {
              code: 404,
              message: 'The requested resource was not found.',
            },
          });
        });
    });
  }
}
