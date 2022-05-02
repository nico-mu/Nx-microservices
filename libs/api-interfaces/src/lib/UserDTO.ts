import { User } from '@prisma/client';
import { Error } from './Error';

export interface UserDTO {
  error?: Error;
  user?: User;
}
