import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userSub: Subscription
  userEmail: string
  idToken: string

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.userEmail = user.email
      this.idToken = user._token
    })
  }

  onUserDelete() {
    console.log("onUserDelete()")
    let deleteObs: Observable<Object>
    deleteObs = this.authService.deleteuser(this.idToken)

    deleteObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/auth']);
      },
      errorMessage => {
        console.log(errorMessage);
      }
    );
  }
}
