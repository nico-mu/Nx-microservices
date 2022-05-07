import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Role } from '@prisma/client';
import { UserDTO } from '@nx-microservices/api-interfaces';
import { Observable } from 'rxjs';
import { AuthController } from './auth.controller';
import { HashingService } from '../util/services/hashing.service';
import { PrismaService } from '../database/prisma.service';
import { UserService } from '../user/user.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;
  let hashingService: HashingService;
  const password = 'password';
  const user = {
    id: 1,
    email: 'first@mail.com',
    password: password,
    createdAt: new Date(),
    username: 'first',
    role: Role.USER,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, HashingService],
    }).compile();
    userService = module.get<UserService>(UserService);
    hashingService = module.get<HashingService>(HashingService);
    authController = new AuthController(hashingService, userService);
  });

  describe('login', () => {
    it('should login a User with the username', async () => {
      hashingService.hash(password).subscribe((hash) => {
        user.password = hash;
        const result: Observable<UserDTO> = new Observable((observer) => {
          observer.next({
            user: user,
            error: {},
          } as UserDTO);
        });
        jest.spyOn(userService, 'user').mockImplementation(() => result);
        authController
          .login({ name: 'first', password: password })
          .subscribe((userRes) =>
            expect(userRes).toStrictEqual({ error: {}, user: user })
          );
      });
    });

    it('should login a User with the email', async () => {
      hashingService.hash(password).subscribe((hash) => {
        user.password = hash;
        const result: Observable<UserDTO> = new Observable((observer) => {
          observer.next({
            user: user,
            error: {},
          } as UserDTO);
        });
        jest.spyOn(userService, 'user').mockImplementation(() => result);
        authController
          .login({ email: 'first@mail.com', password: password })
          .subscribe((userRes) =>
            expect(userRes).toStrictEqual({ error: {}, user: user })
          );
      });
    });

    it('should return error on missing user input', async () => {
      authController.login({ password: password }).subscribe((userRes) =>
        expect(userRes).toStrictEqual({
          error: {
            code: HttpStatus.BAD_REQUEST,
            message: 'Missing Parameter',
          },
          user: {},
        } as UserDTO)
      );
    });
  });

  describe('register', () => {
    it('should register a User', () => {
      hashingService.hash(password).subscribe((hash) => {
        user.password = hash;
        const result: Observable<UserDTO> = new Observable((observer) => {
          observer.next({
            user: user,
            error: {},
          } as UserDTO);
        });
        jest.spyOn(userService, 'createUser').mockImplementation(() => result);
        authController
          .register({
            username: user.username,
            password: password,
            email: user.email,
          })
          .subscribe((userRes) =>
            expect(userRes).toStrictEqual({ error: {}, user: user })
          );
      });
    });

    it('should return error on missing user input', () => {
      authController.register({} as Prisma.UserCreateInput).subscribe((res) => {
        expect(res).toStrictEqual({
          error: { code: HttpStatus.BAD_REQUEST, message: 'Missing Parameter' },
          user: {},
        } as UserDTO);
      });
    });
  });
});
