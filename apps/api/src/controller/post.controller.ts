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
import { PostService } from '../services/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postService.posts({ orderBy: { id: 'desc' } });
  }

  @Get(':id')
  async findOne(@Param() params: { id: number }): Promise<PostModel> {
    return this.postService.post({ id: params.id });
  }

  @Post()
  async create(@Body() body: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postService.createPost(body);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<PostModel> {
    return this.postService.deletePost({ id: params.id });
  }

  @Put(':id')
  async update(
    @Param() params: { id: number },
    @Body() body: Prisma.PostUpdateInput
  ): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: params.id },
      data: body,
    });
  }
}
