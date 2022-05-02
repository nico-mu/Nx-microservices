import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prisma, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpHandlerService {
  constructor(private readonly httpClient: HttpClient) {
    super(httpClient);
  }

  public loginWithEmail(email: string, password: string): Observable<User> {
    return this.post<User>('login', { email, password_hash: password });
  }

  public loginWithName(name: string, password: string): Observable<User> {
    return this.post<User>('login', { name, password_hash: password } as User);
  }

  public register(user: Prisma.UserCreateInput): Observable<User> {
    return this.post<User>('register', user);
  }
}
