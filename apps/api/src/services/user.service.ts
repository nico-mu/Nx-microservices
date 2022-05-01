import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { HashingService } from './hashing.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private hashing: HashingService) {}

  user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Observable<User | null> {
    return from(this.prisma.user.findUnique({ where: userWhereUniqueInput }));
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

  createUser(data: Prisma.UserCreateInput): Observable<User> {
    return new Observable<User>((observer) => {
      this.hashing.hash(data.password_hash as string).subscribe((hash) => {
        data.password_hash = hash;
        this.prisma.user
          .create({
            data,
          })
          .then((user) => {
            observer.next(user);
            observer.complete();
          })
          .catch((err) => {
            observer.error(err);
          });
      });
    });
  }

  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Observable<User> {
    const { where, data } = params;
    return new Observable<User>((observer) => {
      if (data.password_hash) {
        this.hashing.hash(data.password_hash as string).subscribe((hash) => {
          data.password_hash = hash;
          this.prisma.user
            .update({
              data,
              where,
            })
            .then((user) => {
              observer.next(user);
              observer.complete();
            })
            .catch((err) => {
              observer.error(err);
            });
        });
      } else {
        this.prisma.user
          .update({
            data,
            where,
          })
          .then((user) => {
            observer.next(user);
            observer.complete();
          })
          .catch((err) => {
            observer.error(err);
          });
      }
    });
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Observable<User> {
    return from(
      this.prisma.user.delete({
        where,
      })
    );
  }
}
