import { IUserDTO } from './user-dto';

export interface IUserResponse extends Response {
  user: IUserDTO;
}
