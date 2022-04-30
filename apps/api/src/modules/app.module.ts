import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';

import { PostModule } from './post.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
