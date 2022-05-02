import { Post } from '@prisma/client';
import { Error } from './Error';

export interface PostDTO {
  post: Post;
  error: Error;
}
