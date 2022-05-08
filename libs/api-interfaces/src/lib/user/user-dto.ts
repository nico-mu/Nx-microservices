import { User } from '@prisma/client';
import { IError } from '../error';

export interface IUserDTO {
  error?: IError;
  user?: User;
}
