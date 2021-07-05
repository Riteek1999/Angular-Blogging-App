import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { EditorModule } from "@tinymce/tinymce-angular";

import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CommentModel } from '../comment.model';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  // id: number;
  // editMode = false;
  blogForm: FormGroup;
  userSub: Subscription
  userEmail: string
  length: number


  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params['id'];
    //   this.editMode = params['id'] != null;
    this.userSub = this.authService.user.subscribe(user => {
      this.userEmail = user.email
    })
    this.length = this.blogService.getBlogsSize();
      this.initForm();
    // });
  }

  onSubmit() {
    const commentArray: CommentModel[] = [new CommentModel(this.userEmail.substring(0, this.userEmail.indexOf("@")),"Give it a Read")]
    const newBlog = new Blog(
      this.length,
      this.blogForm.value['name'],
      this.blogForm.value['description'],
      this.userEmail.substring(0, this.userEmail.indexOf("@")),
      new Date().toISOString(),
      0,
      0,
      commentArray,
      this.blogForm.value['view']);
    this.blogService.addBlog(newBlog);
    this.dataStorageService.storeBlogs();
    this.onCancel();
  }

  // onAddIngredient() {
  //   (<FormArray>this.recipeForm.get('ingredients')).push(
  //     new FormGroup({
  //       name: new FormControl(null, Validators.required),
  //       amount: new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }

  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // get controls() {
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

  private initForm() {
    let blogName = '';
    let blogDescription = '';
    let blogView = '';

    // if (this.editMode) {
    //   const recipe = this.blogService.getBlog(this.id);
    //   recipeName = recipe.name;
    //   recipeImagePath = recipe.imagePath;
    //   recipeDescription = recipe.description;
    //   if (recipe['ingredients']) {
    //     for (let ingredient of recipe.ingredients) {
    //       recipeIngredients.push(
    //         new FormGroup({
    //           name: new FormControl(ingredient.name, Validators.required),
    //           amount: new FormControl(ingredient.amount, [
    //             Validators.required,
    //             Validators.pattern(/^[1-9]+[0-9]*$/)
    //           ])
    //         })
    //       );
    //     }
    //   }
    // }

    this.blogForm = new FormGroup({
      name: new FormControl(blogName, Validators.required),
      description: new FormControl(blogDescription, Validators.required),
      view: new FormControl(blogView, Validators.required)
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
