import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, Post as PostModel } from '@prisma/client';
import { PostDTO } from '@swipper/api-interfaces';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  findAll(): Observable<PostModel[]> {
    return this.postService.posts({ orderBy: { id: 'desc' } });
  }

  @Get(':id')
  findOne(@Param() params: { id: number }): Observable<PostDTO> {
    return this.postService.post({ id: params.id });
  }

  @Post()
  create(@Body() body: Prisma.PostCreateInput): Observable<PostDTO> {
    return this.postService.createPost(body);
  }

  @Delete(':id')
  delete(@Param() params): Observable<PostDTO> {
    return this.postService.deletePost({ id: params.id });
  }

  @Put(':id')
  update(
    @Param() params: { id: number },
    @Body() body: Prisma.PostUpdateInput
  ): Observable<PostDTO> {
    return this.postService.updatePost({
      where: { id: params.id },
      data: body,
    });
  }
}
