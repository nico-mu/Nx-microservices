import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IPostDTO } from '@nx-microservices/api-interfaces';
import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POST_BY_ID,
  UPDATE_POST,
} from '@nx-microservices/microservice-handler';
import { Prisma, Post as PostModel } from '@prisma/client';
import { Observable } from 'rxjs';
import { PostService } from '../post/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @MessagePattern(GET_POST)
  findAll(): Observable<PostModel[]> {
    return this.postService.posts({ orderBy: { id: 'desc' } });
  }

  @MessagePattern(GET_POST_BY_ID)
  findOne(id: number): Observable<IPostDTO> {
    return this.postService.post({ id });
  }

  @MessagePattern(CREATE_POST)
  create(params: Prisma.PostCreateInput): Observable<IPostDTO> {
    return this.postService.createPost(params);
  }

  @MessagePattern(DELETE_POST)
  delete(id: number): Observable<IPostDTO> {
    return this.postService.deletePost({ id });
  }

  @MessagePattern(UPDATE_POST)
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
