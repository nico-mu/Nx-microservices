import { Module } from '@nestjs/common';

import { PostModule } from './post.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
