import { Component, OnInit } from '@angular/core';
import { Article } from './article';

@Component({
    selector:'pm-article',
    templateUrl:'./article-list.component.html',
    styleUrls:['article-list.component.css']
})

export class ArticleListComponent implements OnInit {
    pageTitle: string = "Article List";
    private _filterInput: string = '';
    filteredArray: Article[];

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
            (article.keyword.toLowerCase().includes(val) || article.name.toLowerCase().includes(val))
        );
    }

    // Mock Data
    articles: Article[] = [
        {
            "articleId": 1,
            "name":"test1",
            "category":"UVA",
            "keyword":"Go Hoos",
            "date": new Date(),
            "available":"Yes"
        },
        {
            "articleId": 2,
            "name":"test2",
            "category":"VT",
            "keyword":"Go Hokies",
            "date": new Date(),
            "available":"No"
        },
        {
            "articleId": 3,
            "name":"test3",
            "category":"Michigan",
            "keyword":"Go Blue",
            "date": new Date(),
            "available":"No"
        },
    ]

    ngOnInit() {
        this.filteredArray = this.articles;
    }
}