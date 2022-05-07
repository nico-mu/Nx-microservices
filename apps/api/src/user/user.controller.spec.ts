import { Test, TestingModule } from '@nestjs/testing';
import { Role, User } from '@prisma/client';
import { UserDTO } from '@nx-microservices/api-interfaces';
import { Observable } from 'rxjs';
import { HashingService } from '../util/services/hashing.service';
import { PrismaService } from '../database/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const user = {
    id: 1,
    email: 'first@mail.com',
    password: 'password',
    createdAt: new Date(),
    username: 'first',
    role: Role.USER,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, HashingService],
    }).compile();
    userService = module.get<UserService>(UserService);
    userController = new UserController(userService);
  });

  describe('findAll', () => {
    it('should return an array of Users', async () => {
      const result: Observable<User[]> = new Observable((observer) => {
        observer.next([
          user,
          {
            id: 2,
            email: 'second@mail.com',
            password: 'second',
            createdAt: new Date(),
            username: 'second',
            role: Role.USER,
          },
        ]);
      });
      jest.spyOn(userService, 'users').mockImplementation(() => result);

      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a User', async () => {
      const result: Observable<UserDTO> = new Observable((observer) => {
        observer.next({
          user: user,
          error: {},
        } as UserDTO);
      });
      jest.spyOn(userService, 'user').mockImplementation(() => result);

      expect(await userController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a User', async () => {
      const result: Observable<UserDTO> = new Observable((observer) => {
        observer.next({
          user: user,
        } as UserDTO);
      });
      jest.spyOn(userService, 'createUser').mockImplementation(() => result);

      expect(
        await userController.create({
          username: 'first',
          email: 'first@mail.com',
          password: 'password',
        })
      ).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a User', async () => {
      const result: Observable<UserDTO> = new Observable((observer) => {
        const updatedUser = user;
        updatedUser.username = 'updated';
        observer.next({
          user: updatedUser,
        } as UserDTO);
      });
      jest.spyOn(userService, 'updateUser').mockImplementation(() => result);

      expect(userController.update(1, { username: 'updated' })).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return a User', async () => {
      const result: Observable<UserDTO> = new Observable((observer) => {
        observer.next({
          user: user,
        } as UserDTO);
      });
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => result);

      expect(userController.delete(1)).toBe(result);
    });
  });
});
