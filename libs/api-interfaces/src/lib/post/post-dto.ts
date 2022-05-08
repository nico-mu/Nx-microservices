import { Post } from '@prisma/client';
import { IError } from '../error';

export interface IPostDTO {
  post: Post;
  error: IError;
}
