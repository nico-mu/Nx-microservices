import { Module } from '@nestjs/common';
import {
  HashingService,
  PrismaService,
} from '@nx-microservices/microservice-services';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, HashingService],
  exports: [UserService],
})
export class UserModule {}
