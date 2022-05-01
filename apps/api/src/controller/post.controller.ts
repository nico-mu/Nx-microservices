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
  findOne(@Param() params: { id: number }): Observable<PostModel> {
    return this.postService.post({ id: params.id });
  }

  @Post()
  create(@Body() body: Prisma.PostCreateInput): Observable<PostModel> {
    return this.postService.createPost(body);
  }

  @Delete(':id')
  delete(@Param() params): Observable<PostModel> {
    return this.postService.deletePost({ id: params.id });
  }

  @Put(':id')
  update(
    @Param() params: { id: number },
    @Body() body: Prisma.PostUpdateInput
  ): Observable<PostModel> {
    return this.postService.updatePost({
      where: { id: params.id },
      data: body,
    });
  }
}
