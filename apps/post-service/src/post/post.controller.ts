import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IPostDTO } from '@nx-microservices/api-interfaces';
import { PostServiceHandler } from '@nx-microservices/microservice-handler';
import { Prisma, Post as PostModel } from '@prisma/client';
import { Observable } from 'rxjs';
import { PostService } from '../post/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @MessagePattern(PostServiceHandler.GET_POSTS)
  findAll(): Observable<PostModel[]> {
    return this.postService.posts({ orderBy: { id: 'desc' } });
  }

  @MessagePattern(PostServiceHandler.GET_POST_UNIQUE)
  findOne(params: Prisma.PostWhereUniqueInput): Observable<IPostDTO> {
    return this.postService.post(params);
  }

  @MessagePattern(PostServiceHandler.CREATE_POST)
  create(params: Prisma.PostCreateInput): Observable<IPostDTO> {
    return this.postService.createPost(params);
  }

  @MessagePattern(PostServiceHandler.DELETE_POST)
  delete(id: number): Observable<IPostDTO> {
    return this.postService.deletePost({ id });
  }

  @MessagePattern(PostServiceHandler.UPDATE_POST)
  update(req: {
    id: number;
    post: Prisma.PostUpdateInput;
  }): Observable<IPostDTO> {
    return this.postService.updatePost({
      where: { id: req.id },
      data: req.post,
    });
  }
}
