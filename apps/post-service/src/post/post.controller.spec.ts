import { Test, TestingModule } from '@nestjs/testing';
import { Post } from '@prisma/client';
import { IPostDTO } from '@nx-microservices/api-interfaces';
import { Observable } from 'rxjs';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '@nx-microservices/microservice-services';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  const post: Post = {
    id: 1,
    title: 'first post',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();
    postService = module.get<PostService>(PostService);
    postController = new PostController(postService);
  });

  describe('findAll', () => {
    it('should return an array of Posts', async () => {
      const result: Observable<Post[]> = new Observable((observer) => {
        observer.next([
          {
            id: 1,
            title: 'first post',
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 1,
          },
          {
            id: 2,
            title: 'second post',
            published: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            authorId: 1,
          },
        ]);
      });
      jest.spyOn(postService, 'posts').mockImplementation(() => result);

      expect(await postController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a Post', async () => {
      const result: Observable<IPostDTO> = new Observable((observer) => {
        observer.next({
          post: post,
          error: {},
        } as IPostDTO);
      });
      jest.spyOn(postService, 'post').mockImplementation(() => result);

      expect(await postController.findOne({ id: 1 })).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a Post', async () => {
      const result: Observable<IPostDTO> = new Observable((observer) => {
        observer.next({
          post: post,
        } as IPostDTO);
      });
      jest.spyOn(postService, 'createPost').mockImplementation(() => result);

      expect(
        await postController.create({
          title: 'first post',
          published: true,
        })
      ).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a Post', async () => {
      const result: Observable<IPostDTO> = new Observable((observer) => {
        const updatedPost = post;
        updatedPost.title = 'updated post';
        observer.next({
          post: post,
        } as IPostDTO);
      });
      jest.spyOn(postService, 'updatePost').mockImplementation(() => result);

      expect(
        postController.update({ id: 1, post: { title: 'updated post' } })
      ).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return a Post', async () => {
      const result: Observable<IPostDTO> = new Observable((observer) => {
        observer.next({
          post: post,
        } as IPostDTO);
      });
      jest.spyOn(postService, 'deletePost').mockImplementation(() => result);

      expect(postController.delete(1)).toBe(result);
    });
  });
});
