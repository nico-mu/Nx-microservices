import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpHandlerService {
  constructor(private readonly httpClient: HttpClient) {
    super(httpClient);
  }

  public getUsers(): Observable<User[]> {
    return this.get<User[]>('users');
  }

  public getUser(id: number): Observable<User> {
    return this.get<User>(`users/${id}`);
  }

  public createUser(user: User): Observable<User> {
    return this.post<User>('users', user);
  }

  public updateUser(id: number, user: User): Observable<User> {
    return this.put<User>(`users/${id}`, user);
  }

  public deleteUser(id: number): Observable<User> {
    return this.delete<User>(`users/${id}`);
  }
}
