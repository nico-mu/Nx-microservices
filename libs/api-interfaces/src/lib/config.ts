import { IConnectionOptions } from './connection-options';

export interface IConfig {
  port: string;
  userService: IConnectionOptions;
  postService: IConnectionOptions;
  authService: IConnectionOptions;
  gatewayPort: string;
  baseURI: string;
}
