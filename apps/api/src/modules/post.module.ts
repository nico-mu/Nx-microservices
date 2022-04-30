import { Module } from '@nestjs/common';
import { PostController } from '../controller/post.controller';
import { PostService } from '../services/post.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
