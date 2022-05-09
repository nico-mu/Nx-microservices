import { Module } from '@nestjs/common';
import {
  HashingService,
  PrismaService,
} from '@nx-microservices/microservice-services';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, HashingService],
  exports: [UserService],
})
export class AppModule {}
