import { Transport } from '@nestjs/microservices';

interface ConnectionOptions {
  transport: Transport;
  options: {
    host: string;
    port: string;
  };
}

interface Config {
  port: string;
  userService: ConnectionOptions;
  postService: ConnectionOptions;
  gatewayPort: string;
  baseURI: string;
}

export class ConfigService {
  private readonly envConfig: Config = null;

  constructor() {
    this.envConfig = {} as Config;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
    this.envConfig.baseURI = process.env.BASE_URI
    this.envConfig.postService = {
      options: {
        port: process.env.POST_SERVICE_PORT,
        host: process.env.POST_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): string | ConnectionOptions {
    return this.envConfig[key];
  }
}
