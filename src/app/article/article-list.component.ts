import { Component, OnInit } from '@angular/core';
import { Article } from './article';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpParams, HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
    selector:'pm-article',
    templateUrl:'./article-list.component.html',
    styleUrls:['article-list.component.css']
})

export class ArticleListComponent implements OnInit {
    socialUser: SocialUser;
    pageTitle: string = "My Article";
    private _filterInput: string = '';
    filteredArray: Article[];
    id: number;
    articles: any;

    constructor(
        private socialAuthService: SocialAuthService,
        private http: HttpClient,
        private cookieService: CookieService,
        private sessionStore: SessionStorageService
    ){}

    get filterInput(): string {
        return this._filterInput;
    }

    set filterInput(val: string) {
        this._filterInput = val;
        this.filteredArray = this.filting(val);
    }

    // This function filters the article list. 
    //It uses array function as well as filter function offered by typescript
    filting(val: string) {
        val = val.toLowerCase();
        return this.articles.filter((article: Article) => 
            (article.keyword.toLowerCase().includes(val) || article.title.toLowerCase().includes(val))
        );
    }

    // Mock Data

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
        });
        let params = new HttpParams().append("email",this.cookieService.get('email'));
        this.http.get('http://localhost/cs4640/get_user_id.php', {params: params}).subscribe( (response) => {
            this.id = Number(response);
            console.log(this.id + " 4640");
            this.sessionStore.store('userid',this.id);
            let article_param = new HttpParams().append("uid",this.id);
            this.http.get('http://localhost/cs4640/get_article.php', {params: article_param}).subscribe( (response) => {
                if (response['message'] == "Success") {
                    this.articles = JSON.stringify(response['data']);
                    this.filteredArray = JSON.parse(this.articles);
                    this.articles = this.filteredArray;
                }
            }, 
            error => {
                console.log(error);
            }); 
        }, 
        error => {
            console.log(error);
        }); 
    }
}