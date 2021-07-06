import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';

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
}
