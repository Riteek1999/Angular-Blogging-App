import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { RecipesComponent } from './recipes/recipes.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BlogDetailComponent } from './home/blog-detail/blog-detail.component';
import { BlogEditComponent } from './home/blog-edit/blog-edit.component';
import { BlogStartComponent } from './home/blog-start/blog-start.component';
import { HomeComponent } from './home/home.component';
import { MyPostDetailComponent } from './my-post/my-post-detail/my-post-detail.component';
import { MyPostEditComponent } from './my-post/my-post-edit/my-post-edit.component';
import { MyPostStartComponent } from './my-post/my-post-start/my-post-start.component';
import { MyPostComponent } from './my-post/my-post.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserStartComponent } from './user/user-start/user-start.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: BlogStartComponent },
      { path: 'new', component: BlogEditComponent },
      {
        path: ':id',
        component: BlogDetailComponent
      }
    ]
  },
  {
    path: 'home/:id/:blogWritter',
    component: UserComponent,
    children: [
      { path: '', component: UserStartComponent },
      {
        path: ':i',
        component: UserDetailComponent
      }
    ]
  },
  { path: 'my-posts', 
    component: MyPostComponent , 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MyPostStartComponent },
      { path: 'edit', component: MyPostEditComponent },
      {
        path: ':id',
        component: MyPostDetailComponent
      },
      {
        path: ':id/edit',
        component: MyPostEditComponent,
      }
    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
