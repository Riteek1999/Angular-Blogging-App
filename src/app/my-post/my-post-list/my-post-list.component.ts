import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from 'src/app/home/blog.model';
import { BlogService } from 'src/app/home/blog.service';


@Component({
  selector: 'app-my-post-list',
  templateUrl: './my-post-list.component.html',
  styleUrls: ['./my-post-list.component.css']
})
export class MyPostListComponent implements OnInit, OnDestroy {
  blogs: Blog[]
  index: number
  subscription: Subscription
  userSub: Subscription
  userEmail: string

  constructor(private blogService: BlogService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.userEmail = user.email
    })
    this.subscription = this.blogService.blogsChanged
      .subscribe(
        (blog: Blog[]) => {
          blog = this.blogService.getBlogswithId(this.userEmail)
          this.blogs = blog
        }
      );
    this.blogs = this.blogService.getBlogswithId(this.userEmail)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
