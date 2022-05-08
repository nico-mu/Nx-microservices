import { User } from '@prisma/client';

export interface IAuthorizedRequest extends Request {
  user: User;
}
