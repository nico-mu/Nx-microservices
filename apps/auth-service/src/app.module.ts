import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { HashingService } from '@nx-microservices/microservice-services';
import { AuthController } from './auth.controller';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    HashingService,
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userServiceOptions = configService.get('userService');
        return ClientProxyFactory.create(userServiceOptions as unknown);
      },
      inject: [ConfigService],
    },
  ],
  exports: [],
})
export class AppModule {}
