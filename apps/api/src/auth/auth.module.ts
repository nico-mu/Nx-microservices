import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { HashingService } from '../util/services/hashing.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [HashingService],
  exports: [],
})
export class AuthModule {}
