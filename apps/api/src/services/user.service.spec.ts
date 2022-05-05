import { Test, TestingModule } from '@nestjs/testing';
import { Role, User } from '@prisma/client';
import { UserDTO } from '@nx-microservices/api-interfaces';
import { Observable } from 'rxjs';
import { HashingService } from './hashing.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let hashingService: HashingService;
  let prismaService: PrismaService;

  const user: User = {
    id: 1,
    email: 'first@mail.com',
    password_hash: 'hashedPassword',
    createdAt: new Date(),
    name: 'first',
    role: Role.USER,
  };

  const result: UserDTO = {
    user: user,
    error: {},
  } as UserDTO;

  const hashingResult: Observable<string> = new Observable((observer) => {
    observer.next('hashedPassword');
  });

  const mock = function () {
    return Promise.resolve(user);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, HashingService],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    hashingService = module.get<HashingService>(HashingService);
    userService = new UserService(prismaService, hashingService);
  });

  describe('user', () => {
    it('should return a User', async () => {
      jest
        .spyOn(hashingService, 'hash')
        .mockImplementation(() => hashingResult);

      prismaService.user.findUnique = jest.fn().mockImplementation(mock);

      await userService
        .user({
          id: 1,
        })
        .subscribe((userRes) => {
          expect(userRes).toStrictEqual(result);
        });
    });
  });

  describe('users', () => {
    it('should return all Users', async () => {
      jest
        .spyOn(hashingService, 'hash')
        .mockImplementation(() => hashingResult);

      const mockMany = function () {
        return Promise.resolve([user, user, user]);
      };
      prismaService.user.findMany = jest.fn().mockImplementation(mockMany);

      await userService.users({}).subscribe((userRes) => {
        expect(userRes).toStrictEqual([user, user, user]);
      });
    });
  });

  describe('createUser', () => {
    it('should create a User', async () => {
      jest
        .spyOn(hashingService, 'hash')
        .mockImplementation(() => hashingResult);

      prismaService.user.create = jest.fn().mockImplementation(mock);

      await userService
        .createUser({
          email: 'first@mail.com',
          name: 'first',
          password_hash: 'password',
        })
        .subscribe((userRes) => {
          expect(userRes).toStrictEqual(result);
        });
    });
  });

  describe('updateUsers', () => {
    it('should update a Users', async () => {
      jest
        .spyOn(hashingService, 'hash')
        .mockImplementation(() => hashingResult);
      const updatedUser = user;
      updatedUser.name = 'updated';
      const mockUpdate = function () {
        return Promise.resolve(updatedUser);
      };
      prismaService.user.update = jest.fn().mockImplementation(mockUpdate);

      await userService
        .updateUser({ where: { id: 1 }, data: user })
        .subscribe((userRes) => {
          expect(userRes).toStrictEqual({
            error: {},
            user: updatedUser,
          } as UserDTO);
        });
    });

    it('should update a User password', async () => {
      jest
        .spyOn(hashingService, 'hash')
        .mockImplementation(() => hashingResult);
      const updatedUser = user;
      updatedUser.password_hash = 'updated';
      const mockUpdate = function () {
        return Promise.resolve(updatedUser);
      };
      prismaService.user.update = jest.fn().mockImplementation(mockUpdate);

      await userService
        .updateUser({ where: { id: 1 }, data: { password_hash: 'password' } })
        .subscribe((userRes) => {
          expect(userRes).toStrictEqual({
            error: {},
            user: updatedUser,
          } as UserDTO);
        });
    });
  });

  describe('deleteUser', () => {
    it('should delete a User', async () => {
      prismaService.user.delete = jest.fn().mockImplementation(mock);

      await userService
        .deleteUser({
          id: 1,
        })
        .subscribe((userRes) => {
          expect(userRes).toStrictEqual(result);
        });
    });
  });
});
