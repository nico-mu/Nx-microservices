import { HttpStatus, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { IPostDTO } from '@nx-microservices/api-interfaces';
import { from, Observable } from 'rxjs';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Observable<IPostDTO> {
    return new Observable((observer) => {
      this.prisma.post
        .findUnique({
          where: postWhereUniqueInput,
        })
        .then((post) => {
          if (post) {
            observer.next({ post, error: {} } as IPostDTO);
          } else {
            observer.next({
              post: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IPostDTO);
          }
          observer.complete();
        })
        .catch(() => {
          observer.next({
            post: {},
            error: {
              code: HttpStatus.NOT_FOUND,
              message: 'The requested resource was not found.',
            },
          } as IPostDTO);
          observer.complete();
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

  createPost(data: Prisma.PostCreateInput): Observable<IPostDTO> {
    return new Observable((observer) => {
      this.prisma.post
        .create({
          data,
        })
        .then((post) => {
          if (post) {
            observer.next({ post, error: {} } as IPostDTO);
          } else {
            observer.next({
              post: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IPostDTO);
          }
          observer.complete();
        })
        .catch(() => {
          observer.next({
            post: {},
            error: {
              code: HttpStatus.UNPROCESSABLE_ENTITY,
              message: 'The post already exists.',
            },
          } as IPostDTO);
          observer.complete();
        });
    });
  }

  updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Observable<IPostDTO> {
    const { where, data } = params;
    return new Observable((observer) => {
      this.prisma.post
        .update({
          where,
          data,
        })
        .then((post) => {
          if (post) {
            observer.next({ post, error: {} } as IPostDTO);
          } else {
            observer.next({
              post: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IPostDTO);
          }
          observer.complete();
        })
        .catch(() => {
          observer.next({
            post: {},
            error: {
              code: HttpStatus.NOT_FOUND,
              message: 'The requested resource was not found.',
            },
          } as IPostDTO);
          observer.complete();
        });
    });
  }

  deletePost(where: Prisma.PostWhereUniqueInput): Observable<IPostDTO> {
    return new Observable((observer) => {
      this.prisma.post
        .delete({
          where,
        })
        .then((post) => {
          if (post) {
            observer.next({ post, error: {} } as IPostDTO);
          } else {
            observer.next({
              post: {},
              error: {
                code: HttpStatus.NOT_FOUND,
                message: 'The requested resource was not found.',
              },
            } as IPostDTO);
          }
          observer.complete();
        })
        .catch(() => {
          observer.next({
            post: {},
            error: {
              code: HttpStatus.NOT_FOUND,
              message: 'The requested resource was not found.',
            },
          } as IPostDTO);
          observer.complete();
        });
    });
  }
}
