import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/home/blog.model';
import { BlogService } from 'src/app/home/blog.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


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
          console.log(this.blogs)
        }
      );
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
