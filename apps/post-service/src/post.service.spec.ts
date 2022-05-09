import { Test, TestingModule } from '@nestjs/testing';
import { Post } from '@prisma/client';
import { IPostDTO } from '@nx-microservices/api-interfaces';
import { PrismaService } from '@nx-microservices/microservice-services';
import { PostService } from './services/post.service';

describe('PostService', () => {
  let postService: PostService;
  let prismaService: PrismaService;

  const post: Post = {
    id: 1,
    title: 'first post',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 1,
  };

  const result: IPostDTO = {
    post: post,
    error: {},
  } as IPostDTO;

  const mock = function () {
    return Promise.resolve(post);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    postService = new PostService(prismaService);
  });

  describe('post', () => {
    it('should return a Post', async () => {
      prismaService.post.findUnique = jest.fn().mockImplementation(mock);

      await postService
        .post({
          id: 1,
        })
        .subscribe((postRes) => {
          expect(postRes).toStrictEqual(result);
        });
    });
  });

  describe('posts', () => {
    it('should return all Posts', async () => {
      const mockMany = function () {
        return Promise.resolve([post, post, post]);
      };
      prismaService.post.findMany = jest.fn().mockImplementation(mockMany);

      await postService.posts({}).subscribe((postRes) => {
        expect(postRes).toStrictEqual([post, post, post]);
      });
    });
  });

  describe('createPost', () => {
    it('should create a Post', async () => {
      prismaService.post.create = jest.fn().mockImplementation(mock);

      await postService
        .createPost({
          title: 'first post',
          published: true,
        })
        .subscribe((postRes) => {
          expect(postRes).toStrictEqual(result);
        });
    });
  });

  describe('updatePosts', () => {
    it('should update a Posts', async () => {
      const updatedPost = post;
      updatedPost.title = 'updated';
      const mockUpdate = function () {
        return Promise.resolve(updatedPost);
      };
      prismaService.post.update = jest.fn().mockImplementation(mockUpdate);

      await postService
        .updatePost({ where: { id: 1 }, data: post })
        .subscribe((postRes) => {
          expect(postRes).toStrictEqual({
            error: {},
            post: updatedPost,
          } as IPostDTO);
        });
    });
  });

  describe('deletePost', () => {
    it('should delete a Post', async () => {
      prismaService.post.delete = jest.fn().mockImplementation(mock);

      await postService
        .deletePost({
          id: 1,
        })
        .subscribe((postRes) => {
          expect(postRes).toStrictEqual(result);
        });
    });
  });
});
