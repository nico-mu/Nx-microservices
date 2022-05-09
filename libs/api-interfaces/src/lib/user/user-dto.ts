import { User } from '@prisma/client';
import { IError } from '../error-interface';

export interface IUserDTO {
  error?: IError;
  user?: User;
}
