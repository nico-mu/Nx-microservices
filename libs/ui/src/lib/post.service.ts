import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@prisma/client';
import { Observable } from 'rxjs';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends HttpHandlerService {
  constructor(private readonly httpClient: HttpClient) {
    super(httpClient);
  }

  public getPosts(): Observable<Post[]> {
    return this.get<Post[]>('posts');
  }

  public getPost(id: number): Observable<Post> {
    return this.get<Post>(`posts/${id}`);
  }

  public createPost(post: Post): Observable<Post> {
    return this.post<Post>('posts', post);
  }

  public updatePost(id: number, post: Post): Observable<Post> {
    return this.put<Post>(`posts/${id}`, post);
  }

  public deletePost(id: number): Observable<Post> {
    return this.delete<Post>(`posts/${id}`);
  }
}
