import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IPostDTO } from '@nx-microservices/api-interfaces';
import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POST_UNIQUE,
  UPDATE_POST,
} from '@nx-microservices/microservice-handler';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(
    @Inject('POST_SERVICE') private readonly postService: ClientProxy
  ) {}

  @Get()
  public getPosts(): Observable<IPostDTO> {
    return this.postService.send(GET_POST, '');
  }

  @Get(':id')
  public getPostById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<IPostDTO> {
    return this.postService.send(GET_POST_UNIQUE, { id });
  }

  @Post()
  public createPost(
    @Body() body: Prisma.PostCreateInput
  ): Observable<IPostDTO> {
    return this.postService.send(CREATE_POST, body);
  }

  @Put(':id')
  public updatePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number,
    @Body() body: Prisma.PostUpdateInput
  ): Observable<IPostDTO> {
    return this.postService.send(UPDATE_POST, { id, post: body });
  }

  @Delete(':id')
  public deletePost(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): Observable<IPostDTO> {
    return this.postService.send(DELETE_POST, id);
  }
}
