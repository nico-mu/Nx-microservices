import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule],
  controllers: [PostController],
  providers: [],
})
export class AppModule {}
