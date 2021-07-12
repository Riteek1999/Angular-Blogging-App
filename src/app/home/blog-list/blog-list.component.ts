import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[]
  renderedBlog: Blog[]
  subscription: Subscription
  @Input() isAuthenticated: boolean
  searchItem: string = ''
  error: string = ''
  filter: string = ''
  showSearch: boolean
  show: Subscription
  showFilter: boolean

  constructor(private blogService: BlogService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.blogService.blogsChanged
      .subscribe(
        (blog: Blog[]) => {
          blog = this.blogService.getPublicBlogs()
          this.blogs = blog;
        }
      );
    this.blogs = this.blogService.getPublicBlogs()
    this.renderedBlog = this.blogs
    this.show = this.blogService.show
      .subscribe(
        (r: boolean) => {
          this.showSearch = this.blogService.getSearch()
          this.showFilter = this.blogService.getFilter()
        }
      )
    this.showSearch = this.blogService.getSearch()
  }

  // ngOnChanges() {
  //   this.blogs = this.blogService.getPublicBlogs()
  //   this.renderedBlog = this.blogs
  // }

  onNewBlog() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.show.unsubscribe()
  }

  // passtoDateConversion(date: Date) {
  //   this.blogService.dateConversion(date)
  // }

  onSearch() {
    this.blogs = this.renderedBlog.filter(blog => {
      console.log(this.searchItem)
      if(this.searchItem!=''){
        return (blog.writter === this.searchItem || blog.name === this.searchItem)
      }
      else {
        return blog
      }
    })
    console.log(this.blogs)
    if(this.blogs.length != 0) {
      this.error = ''
    }
    else {
      this.error = "No Match Found"
    }
  }

  onFilter() {
    console.log(this.filter)
    this.blogs = this.renderedBlog.filter(blog => {
      if(this.filter == "Featured"){
        return (blog.like > 2)
      }
      else if (this.filter == "Latest"){
        let currentTime = new Date();
        let postTime = new Date(blog.time);
        let days = (currentTime.getTime() - postTime.getTime()) / (1000 * 3600 * 24);
        return days < 1
      }
      else {
        return blog
      }
    })
    if(this.filter == "Remove Filter") {
      this.filter = ''
    }
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
