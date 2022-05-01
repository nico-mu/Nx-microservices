import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { HttpHandlerService } from './http-handler.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpHandlerService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {
    super(httpClient);
  }

  public loginWithEmail(email: string, password: string): Observable<User> {
    return this.post<User>('users/login', { email, password });
  }

  public loginWithName(name: string, password: string): Observable<User> {
    return this.post<User>('users/login', { name, password });
  }

  public register(user: User): Observable<User> {
    return this.userService.createUser(user);
  }
}
