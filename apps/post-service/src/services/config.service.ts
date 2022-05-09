import { Transport } from '@nestjs/microservices';
import { IConfig, IConnectionOptions } from '@nx-microservices/api-interfaces';

export class ConfigService {
  private readonly envConfig: IConfig = null;

  constructor() {
    this.envConfig = {} as IConfig;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.baseURI = process.env.BASE_URI;
    this.envConfig.postService = {
      options: {
        port: process.env.POST_SERVICE_PORT,
        host: process.env.POST_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): string | IConnectionOptions {
    return this.envConfig[key];
  }
}
