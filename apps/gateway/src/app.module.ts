import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PostController } from './post.controller';
import { ConfigService } from './services/config.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [PostController, UserController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions as unknown);
      },
      inject: [ConfigService],
    },
    {
      provide: 'POST_SERVICE',
      useFactory: (configService: ConfigService) => {
        const postServiceOptions = configService.get('postService');
        return ClientProxyFactory.create(postServiceOptions as unknown);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
