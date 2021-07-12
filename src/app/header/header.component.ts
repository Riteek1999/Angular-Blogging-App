import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
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

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private blogservice: BlogService
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
}
