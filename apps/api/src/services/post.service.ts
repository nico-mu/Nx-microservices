import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PostDTO } from '@swipper/api-interfaces';
import { from, Observable } from 'rxjs';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  post(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Observable<PostDTO> {
    return new Observable((observer) => {
      this.prisma.post
        .findUnique({
          where: postWhereUniqueInput,
        })
        .then((post) => {
          observer.next({
            post,
            error: null,
          });
        })
        .catch(() => {
          observer.next({
            post: null,
            error: {
              code: 404,
              message: 'The requested resource was not found.',
            },
          });
        });
    });
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

  createPost(data: Prisma.PostCreateInput): Observable<PostDTO> {
    return new Observable((observer) => {
      this.prisma.post
        .create({
          data,
        })
        .then((post) => {
          observer.next({
            post,
            error: null,
          });
        })
        .catch(() => {
          observer.next({
            post: null,
            error: {
              code: 422,
              message: 'The post already exists.',
            },
          });
        });
    });
  }

  updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Observable<PostDTO> {
    const { where, data } = params;
    return new Observable((observer) => {
      this.prisma.post
        .update({
          where,
          data,
        })
        .then((post) => {
          observer.next({
            post,
            error: null,
          });
        })
        .catch(() => {
          observer.next({
            post: null,
            error: {
              code: 404,
              message: 'The requested resource was not found.',
            },
          });
        });
    });
  }

  deletePost(where: Prisma.PostWhereUniqueInput): Observable<PostDTO> {
    return new Observable((observer) => {
      this.prisma.post
        .delete({
          where,
        })
        .then((post) => {
          observer.next({
            post,
            error: null,
          });
        })
        .catch(() => {
          observer.next({
            post: null,
            error: {
              code: 404,
              message: 'The requested resource was not found.',
            },
          });
        });
    });
  }
}
