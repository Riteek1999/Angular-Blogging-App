import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BlogDetailComponent } from './home/blog-detail/blog-detail.component';
import { BlogEditComponent } from './home/blog-edit/blog-edit.component';
import { HomeComponent } from './home/home.component';
import { MyPostDetailComponent } from './my-post/my-post-detail/my-post-detail.component';
import { MyPostEditComponent } from './my-post/my-post-edit/my-post-edit.component';
import { MyPostComponent } from './my-post/my-post.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserComponent } from './user/user.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'new', component: BlogEditComponent }
    ]
  },
  {
    path: 'home/:id',
    component: BlogDetailComponent
  },
  {
    path: 'home/:id/:blogWritter',
    component: UserComponent
  },
  {
    path: 'home/:id/:blogWritter/:i',
    component: UserDetailComponent
  },
  { path: 'my-posts', 
    component: MyPostComponent , 
    canActivate: [AuthGuard]
  },
  {
    path: 'my-posts/:id',
    component: MyPostDetailComponent,
  },
  {
    path: 'my-posts/:id/edit',
    component: MyPostEditComponent  
  },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
