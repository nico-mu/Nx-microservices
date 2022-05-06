import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma, Post as PostModel } from '@prisma/client';
import { PostDTO } from '@nx-microservices/api-interfaces';
import { Observable } from 'rxjs';
import { PostService } from '../post/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  findAll(): Observable<PostModel[]> {
    return this.postService.posts({ orderBy: { id: 'desc' } });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<PostDTO> {
    return this.postService.post({ id });
  }

  @Post()
  create(@Body() body: Prisma.PostCreateInput): Observable<PostDTO> {
    return this.postService.createPost(body);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<PostDTO> {
    return this.postService.deletePost({ id });
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() body: Prisma.PostUpdateInput
  ): Observable<PostDTO> {
    return this.postService.updatePost({
      where: { id },
      data: body,
    });
  }
}
