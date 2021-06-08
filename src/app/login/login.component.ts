import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean; 
  constructor(
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) { this.isLoggedin = false;}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      if (this.isLoggedin) {
        this.cookieService.set('username',this.socialUser.name,1);
        this.cookieService.set('email',this.socialUser.email,1);
        this.router.navigate(['/article']);
        this.http.post('http://localhost/cs4640/user.php', { name: this.socialUser.name, email: this.socialUser.email }).subscribe(data => {
          console.log("user checked");
        },
          error => {
            console.log(error);
          }
        )
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
