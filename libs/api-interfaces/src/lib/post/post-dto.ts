import { Post } from '@prisma/client';
import { IError } from '../error-interface';

export interface IPostDTO {
  post: Post;
  error: IError;
}
