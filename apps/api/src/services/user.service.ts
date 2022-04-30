import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  user = async (
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> => {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  };

  users = async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  };

  createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
    return this.prisma.user.create({
      data,
    });
  };

  updateUser = async (params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> => {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  };

  deleteUser = async (where: Prisma.UserWhereUniqueInput): Promise<User> => {
    return this.prisma.user.delete({
      where,
    });
  };
}
