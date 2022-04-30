import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { PrismaService } from '../services/prisma.service';
import { UserService } from '../services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
