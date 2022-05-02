import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Role } from '@prisma/client';
import { UserDTO } from '@swipper/api-interfaces';
import { Observable } from 'rxjs';
import { HashingService } from './hashing.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let hashingService: HashingService;
  let prismaService: PrismaService;

  const result: Observable<UserDTO> = new Observable((observer) => {
    observer.next({
      user: {
        id: 1,
        email: 'first@mail.com',
        password_hash: 'hashedPassword',
        createdAt: new Date(),
        name: 'first',
        role: Role.USER,
      },
      error: {},
    } as UserDTO);
  });

  const hashingResult: Observable<string> = new Observable((observer) => {
    observer.next('hashedPassword');
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, HashingService],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    hashingService = module.get<HashingService>(HashingService);
    userService = new UserService(prismaService, hashingService);
  });

  describe('createUser', () => {
    it('should return a User', async () => {
      jest
        .spyOn(hashingService, 'hash')
        .mockImplementation(() => hashingResult);
      prismaService.user.create = jest.fn().mockImplementation(() => result);
      expect(
        await userService.createUser({
          email: 'first@mail.com',
          name: 'first',
          password_hash: 'password',
        })
      ).toBe(result);
    });
  });
});
