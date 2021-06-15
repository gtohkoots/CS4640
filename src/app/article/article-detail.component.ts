import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from './article';

@Component({
    selector:'pm-detail',
    templateUrl:'./article-detail.component.html',
    styleUrls:['article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {
    article: Article;
    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ){ }
    ngOnInit() {
        let id = Number(this.route.snapshot.paramMap.get('id'));
        let params = new HttpParams().append("id", id);
        this.http.get('http://localhost/cs4640/get_article_id.php', {params: params}).subscribe( response => {
            if(response['message'] == 'Success'){
                this.article = response['data'];
                console.log(this.article);
            }
        }, error => {
            console.log(error);
        })
    }
}