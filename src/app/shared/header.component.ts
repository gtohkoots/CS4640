import { Component, OnInit } from '@angular/core'

import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector:'pm-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit {
    socialUser: SocialUser;
    username: String;
    constructor(
        private socialAuthService: SocialAuthService,
        private router: Router,
        private cookieService: CookieService
    ){ this.username = 'Guest'; }

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.username = this.cookieService.get('username');
        });
    }

    // This function implements an anonymous function 
    // which ask the user whether or not to log out
    logOut(): void {
        var result = (function() {
            var ans = confirm("Are you sure you want to logout?");
            if (ans) {
                return true;
            }
            else {
                return false;
            }
        })();
        if (result) {
            this.cookieService.deleteAll();
            this.socialAuthService.signOut();
            this.router.navigate(['']);
        }
        else {
            alert("logout canceled");
        }
    }
}