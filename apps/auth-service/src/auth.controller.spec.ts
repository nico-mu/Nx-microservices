import { HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import {
  HashingService,
  PrismaService,
} from '@nx-microservices/microservice-services';
import { Prisma, Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
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
      providers: [PrismaService, HashingService],
    }).compile();
    hashingService = module.get<HashingService>(HashingService);
    authController = new AuthController(hashingService, ClientProxy.prototype);
  });

  describe('login', () => {
    it('should login a User with the username', async () => {
      hashingService.hash(password).subscribe((hash) => {
        user.password = hash;
        const result: Observable<IUserDTO> = new Observable((observer) => {
          observer.next({
            user: user,
            error: {},
          } as IUserDTO);
        });
        jest
          .spyOn(ClientProxy.prototype, 'send')
          .mockImplementation(() => result);
        authController
          .login({ username: 'first', password: password })
          .subscribe((userRes) =>
            expect(userRes).toStrictEqual({ error: {}, user: user })
          );
      });
    });

    it('should login a User with the email', async () => {
      hashingService.hash(password).subscribe((hash) => {
        user.password = hash;
        const result: Observable<IUserDTO> = new Observable((observer) => {
          observer.next({
            user: user,
            error: {},
          } as IUserDTO);
        });
        jest
          .spyOn(ClientProxy.prototype, 'send')
          .mockImplementation(() => result);
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
        } as IUserDTO)
      );
    });
  });

  describe('register', () => {
    it('should register a User', () => {
      hashingService.hash(password).subscribe((hash) => {
        user.password = hash;
        const result: Observable<IUserDTO> = new Observable((observer) => {
          observer.next({
            user: user,
            error: {},
          } as IUserDTO);
        });
        jest
          .spyOn(ClientProxy.prototype, 'send')
          .mockImplementation(() => result);
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
        } as IUserDTO);
      });
    });
  });
});
