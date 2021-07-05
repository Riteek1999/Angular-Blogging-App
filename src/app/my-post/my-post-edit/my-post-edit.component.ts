import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { BlogService } from 'src/app/home/blog.service';
import { Blog } from 'src/app/home/blog.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-my-post-edit',
  templateUrl: './my-post-edit.component.html',
  styleUrls: ['./my-post-edit.component.css']
})
export class MyPostEditComponent implements OnInit {
  id: number
  editMode = false
  blogForm: FormGroup
  userSub: Subscription
  userEmail: string
  length: number

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.userEmail = user.email
    })
    this.length = this.blogService.getBlogsSize();
  }

  onSubmit() {
    const blog = this.blogService.getfilteredBlog(this.id)
    const updatedBlog = new Blog(
      blog.id,
      this.blogForm.value['name'],
      this.blogForm.value['description'],
      this.userEmail.substring(0, this.userEmail.indexOf("@")),
      new Date().toISOString(),
      blog.like,
      blog.dislike,
      blog.comment,
      blog.view);

    this.blogService.updateBlog(this.id, updatedBlog);
    this.dataStorageService.storeBlogs();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let blogName = '';
    let blogDescription = '';

    if (this.editMode) {
      const blog = this.blogService.getfilteredBlog(this.id);
      blogName = blog.name;
      blogDescription = blog.description;
    }

    this.blogForm = new FormGroup({
      name: new FormControl(blogName, Validators.required),
      description: new FormControl(blogDescription, Validators.required)
    });
  }
}
