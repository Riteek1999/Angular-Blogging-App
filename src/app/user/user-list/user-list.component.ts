import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from 'src/app/home/blog.model';
import { BlogService } from 'src/app/home/blog.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  blogs: Blog[]
  index: number
  subscription: Subscription
  userSub: Subscription
  blogWritter: string = ''

  constructor(private blogService: BlogService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.blogService.blogsChanged
      .subscribe(
        (blog: Blog[]) => {
          this.blogs = blog;
        }
      );
      this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params['blogWritter'])
          this.blogWritter = params['blogWritter'];
          this.blogs = this.blogService.getBlogswithWritter(this.blogWritter);
        }
      );
      // this.blogs = this.blogService.getBlogs().filter(blog => {
      //   console.log(blog.view)
      //   return (blog.view === "Public")
      // })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
