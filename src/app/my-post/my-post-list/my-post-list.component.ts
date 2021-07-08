import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from 'src/app/home/blog.model';
import { BlogService } from 'src/app/home/blog.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

}
