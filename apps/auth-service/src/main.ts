import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.AUTH_SERVICE_PORT || 3003;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: port },
    } as TcpOptions
  );
  Logger.log(`🚀 Starting auth-service on port ${port}...`);
  app.listen();
}

bootstrap();
