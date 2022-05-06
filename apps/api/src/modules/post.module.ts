import { Module } from '@nestjs/common';
import { PostController } from '../controller/post.controller';
import { PostService } from '../post/post.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
