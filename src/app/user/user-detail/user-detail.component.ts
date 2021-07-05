import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from 'src/app/home/blog.model';
import { BlogService } from 'src/app/home/blog.service';
import { CommentModel } from 'src/app/home/comment.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy{
  blog: Blog
  id: number
  private userSub: Subscription
  isAuthenticated = false
  comment: string = ''
  userEmail: string

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['i'];
          this.blog = this.blogService.getWritterBlog(this.id);
        }
      );
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
      if(this.isAuthenticated){
        this.userEmail = user.email
      }
    });
  }

  onLike(){
    console.log("onLike()")
    this.blog.like = this.blog.like + 1
    this.dataStorageService.storeBlogs()
    console.log(this.blog.like)
  }
  onDisLike(){
    console.log("onDisLike()")
    this.blog.dislike = this.blog.dislike + 1
    this.dataStorageService.storeBlogs()
    console.log(this.blog.dislike)
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onComment(){
    const postComment: CommentModel = new CommentModel(this.userEmail.substring(0, this.userEmail.indexOf("@")),this.comment)
    this.blog.comment = [...this.blog.comment, postComment]
    this.dataStorageService.storeBlogs()
    this.comment = ''
  }
}
