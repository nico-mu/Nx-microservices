import { Module } from '@nestjs/common';
import { PrismaService } from '@nx-microservices/microservice-services';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
