import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from '../auth/auth.service';
import { BlogService } from '../home/blog.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isShown = false;
  private userSub: Subscription;
  display = "none";
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private blogservice: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
    this.dataStorageService.fetchBlogs().subscribe();
  }

  onSaveData() {
    this.dataStorageService.storeBlogs();
  }

  onFetchData() {
    this.dataStorageService.fetchBlogs().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onClickSearch() {
    console.log("onClickSearch")
    this.blogservice.displaySearch()
  }

  onClickFilter() {
    console.log("onClickFilter")
    this.blogservice.displayFilter()
  }
  openModal() {
    this.display = "block"
  }
  onCloseHandled() {
    this.display = "none"
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/home']);
        this.onCloseHandled()
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null
  }
}
