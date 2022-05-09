import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IUserDTO } from '@nx-microservices/api-interfaces';
import { LOGIN, REGISTER } from '@nx-microservices/microservice-handler';
import { Observable } from 'rxjs';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy
  ) {}

  @Post('/login')
  public login(
    @Body() body: { username: string; password: string }
  ): Observable<IUserDTO> {
    return this.authService.send(LOGIN, body);
  }

  @Post('/register')
  public register(
    @Body() body: { username: string; password: string; email: string }
  ): Observable<IUserDTO> {
    return this.authService.send(REGISTER, body);
  }
}
