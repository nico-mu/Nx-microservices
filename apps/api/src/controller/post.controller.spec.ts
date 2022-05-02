import { Test, TestingModule } from '@nestjs/testing';
import { Role, User } from '@prisma/client';
import { UserDTO } from '@swipper/api-interfaces';
import { Observable } from 'rxjs';
import { HashingService } from '../services/hashing.service';
import { PrismaService } from '../services/prisma.service';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

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
          {
            id: 1,
            email: 'first@mail.com',
            password_hash: 'password',
            createdAt: new Date(),
            name: 'first',
            role: Role.USER,
          },
          {
            id: 2,
            email: 'second@mail.com',
            password_hash: 'second',
            createdAt: new Date(),
            name: 'second',
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
          user: {
            id: 1,
            email: 'first@mail.com',
            password_hash: 'password',
            createdAt: new Date(),
            name: 'first',
            role: Role.USER,
          },
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
          user: {
            id: 1,
            email: 'first@mail.com',
            password_hash: 'password',
            createdAt: new Date(),
            name: 'first',
            role: Role.USER,
          },
        } as UserDTO);
      });
      jest.spyOn(userService, 'createUser').mockImplementation(() => result);

      expect(
        await userController.create({
          name: 'first',
          email: 'first@mail.com',
          password_hash: 'password',
        })
      ).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a User', async () => {
      const result: Observable<UserDTO> = new Observable((observer) => {
        observer.next({
          user: {
            id: 1,
            email: 'first@mail.com',
            password_hash: 'password',
            createdAt: new Date(),
            name: 'first',
            role: Role.USER,
          },
        } as UserDTO);
      });
      jest.spyOn(userService, 'updateUser').mockImplementation(() => result);

      expect(userController.update(1, { name: 'first' })).toBe(result);
    });
  });

  describe('delete', () => {
    it('should return a User', async () => {
      const result: Observable<UserDTO> = new Observable((observer) => {
        observer.next({
          user: {
            id: 1,
            email: 'first@mail.com',
            password_hash: 'password',
            createdAt: new Date(),
            name: 'first',
            role: Role.USER,
          },
        } as UserDTO);
      });
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => result);

      expect(userController.delete(1)).toBe(result);
    });
  });
});
