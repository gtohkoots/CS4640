import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import * as $ from 'jquery';

@Component({
    selector:'pm-comment',
    templateUrl:'./comment.component.html',
    styleUrls:['comment.component.css']
})

export class CommentComponent implements OnInit{

    @SessionStorage('userid')
    userid: number;
    comment_num: number;
    comments: any[];
    article_id: number;
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ){
        this.comment_num = 0;
    }

    toggleCard() {
        $("#card-target").slideToggle(800);
    }

    submitComment() {
        var input = prompt("Please enter your comment here!");
        this.http.post('http://localhost/cs4640/comment_submit.php',{content:input, uid: this.userid, aid: this.article_id})
        .subscribe( response => {
            alert("Comment Submitted!");
            //this.refresh();
        }, error => {
            alert("Comment Submitted");
            console.log(error);
            //alert(error);
        })
    }

    refresh() {
        let params = new HttpParams().append("id", this.article_id);
        this.http.get('http://localhost/cs4640/get_comments.php',{params:params}).subscribe( response => {
            if (response['message'] == 'Success') {
                this.comments = response['data'];
            }
            else {
                alert(response['data']);
            }
        }, error => {
            console.log(error);
        }) 
    }

    ngOnInit() {
        this.article_id = Number(this.route.snapshot.paramMap.get('id'));
        let params = new HttpParams().append("id", this.article_id);
        this.http.get('http://localhost/cs4640/get_comments.php',{params:params}).subscribe( response => {
            if (response['message'] == 'Success') {
                this.comments = response['data'];
            }
            else {
                alert(response['data']);
            }
        }, error => {
            console.log(error);
        })
    }
}