import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { UserController } from '../controller/user.controller';
import { HashingService } from '../services/hashing.service';
import { PrismaService } from '../services/prisma.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
  providers: [UserService, PrismaService, HashingService],
  exports: [UserService],
})
export class UserModule {}
