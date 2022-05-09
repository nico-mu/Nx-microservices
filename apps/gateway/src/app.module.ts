import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './controller/auth.controller';
import { PostController } from './controller/post.controller';
import { UserController } from './controller/user.controller';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [PostController, UserController, AuthController],
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
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions as unknown);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
