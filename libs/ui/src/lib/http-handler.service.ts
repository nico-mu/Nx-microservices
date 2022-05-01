import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpHandlerService {
  protected readonly API_URL = 'http://localhost:3333/api';
  private readonly http: HttpClient;
  protected constructor(http: HttpClient) {
    this.http = http;
  }

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${url}`);
  }

  protected post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.API_URL}/${url}`, body);
  }

  protected put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${url}`, body);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${url}`);
  }
}
