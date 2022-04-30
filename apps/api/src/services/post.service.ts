import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  post = async (
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<Post | null> => {
    return this.prisma.post.findUnique({ where: postWhereUniqueInput });
  };

  posts = async (params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> => {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  };

  createPost = async (data: Prisma.PostCreateInput): Promise<Post> => {
    return this.prisma.post.create({
      data,
    });
  };

  updatePost = async (params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> => {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  };

  deletePost = async (where: Prisma.PostWhereUniqueInput): Promise<Post> => {
    return this.prisma.post.delete({
      where,
    });
  };
}
