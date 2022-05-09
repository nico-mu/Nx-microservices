import { Transport } from '@nestjs/microservices';

export interface IConnectionOptions {
  transport: Transport;
  options: {
    host: string;
    port: string;
  };
}
