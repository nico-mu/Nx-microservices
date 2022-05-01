import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Observable<Post | null> {
    return from(this.prisma.post.findUnique({ where: postWhereUniqueInput }));
  }

  posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Observable<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return from(
      this.prisma.post.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
    );
  }

  createPost(data: Prisma.PostCreateInput): Observable<Post> {
    return from(
      this.prisma.post.create({
        data,
      })
    );
  }

  updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Observable<Post> {
    const { where, data } = params;
    return from(
      this.prisma.post.update({
        data,
        where,
      })
    );
  }

  deletePost(where: Prisma.PostWhereUniqueInput): Observable<Post> {
    return from(
      this.prisma.post.delete({
        where,
      })
    );
  }
}
