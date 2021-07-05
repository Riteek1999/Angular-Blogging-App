import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Blog } from '../home/blog.model';

import { AuthService } from '../auth/auth.service';
import { BlogService } from '../home/blog.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  storeBlogs() {
    const blogs = this.blogService.getBlogs();
    this.http
      .put(
        'https://blogging-application-5c968-default-rtdb.firebaseio.com/blogs.json',
        blogs
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchBlogs() {
    return this.http
      .get<Blog[]>(
        'https://blogging-application-5c968-default-rtdb.firebaseio.com/blogs.json'
      )
      .pipe(
        map(blogs => {
          return blogs.map(blog => {
            return {
              ...blog
            };
          });
        }),
        tap(blogs => {
          this.blogService.setBlogs(blogs);
        })
      );
  }
}
