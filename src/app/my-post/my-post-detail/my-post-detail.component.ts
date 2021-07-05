import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Blog } from 'src/app/home/blog.model';
import { BlogService } from 'src/app/home/blog.service';
import { CommentModel } from 'src/app/home/comment.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-my-post-detail',
  templateUrl: './my-post-detail.component.html',
  styleUrls: ['./my-post-detail.component.css']
})
export class MyPostDetailComponent implements OnInit, OnDestroy{
  blog: Blog
  id: number
  comment: string
  userEmail: string
  private userSub: Subscription

  constructor(private blogService: BlogService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.blog = this.blogService.getfilteredBlog(this.id);
          console.log(this.blog)
        }
      );
      this.userSub = this.authService.user.subscribe(user => {
          this.userEmail = user.email
      });
  }

  onEditBlog() {
    console.log("edit Blog")
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteBlog() {
    const blog = this.blogService.getfilteredBlog(this.id)
    this.blogService.deleteBlog(this.id,blog);
    this.dataStorageService.storeBlogs();
    this.router.navigate(['/my-posts']);
  }

  onComment(){
    const postComment: CommentModel = new CommentModel(this.userEmail.substring(0, this.userEmail.indexOf("@")),this.comment)
    this.blog.comment = [...this.blog.comment, postComment]
    this.dataStorageService.storeBlogs()
    this.comment = ''
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
