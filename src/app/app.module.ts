import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { BlogDetailComponent } from './home/blog-detail/blog-detail.component';
import { BlogEditComponent } from './home/blog-edit/blog-edit.component';
import { BlogListComponent } from './home/blog-list/blog-list.component';
import { HomeComponent } from './home/home.component';
import { MyPostDetailComponent } from './my-post/my-post-detail/my-post-detail.component';
import { MyPostEditComponent } from './my-post/my-post-edit/my-post-edit.component';
import { MyPostListComponent } from './my-post/my-post-list/my-post-list.component';
import { MyPostComponent } from './my-post/my-post.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShortenPipe } from './shared/shorten.pipe';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { FooterComponent } from './footer/footer.component';
import { ReversePipe } from './shared/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogEditComponent,
    MyPostComponent,
    MyPostEditComponent,
    MyPostListComponent,
    MyPostDetailComponent,
    AuthComponent,
    ShortenPipe,
    ReversePipe,
    DropdownDirective,
    ProfileComponent,
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    LoadingSpinnerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    EditorModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
