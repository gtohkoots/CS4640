import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpParams, HttpClient } from "@angular/common/http";
import { SessionStorage } from 'ngx-webstorage';
import { Category } from '../category/category';

@Component({
    selector:'pm-post',
    templateUrl:'./article-post.component.html',
    styleUrls:['article-post.component.css']
})

export class PostArticleComponent implements OnInit {
    socialUser: SocialUser;
    articleForm: FormGroup;
    categories: Category[];
    public selectedFile: any;
    @SessionStorage('userid')
    userid: number;

    constructor(
        private socialAuthService: SocialAuthService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
    ){
        this.createForm();
    }

    onFileChanged(event: any): void{
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }

    createForm(){
        this.articleForm = this.formBuilder.group({
          cid: new FormControl(''),
          uid: this.userid,
          title: new FormControl(''),  
          keyword: new FormControl(''),
          text: new FormControl(''),
          //image: ['', Validators.required]
        });
      }

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
        });
        let params = new HttpParams().append("email",this.socialUser.email);
        this.http.get('http://localhost/cs4640/get_user_id.php', {params: params}).subscribe( (response) => {
            this.userid = Number(response);
        }, 
        error => {
            console.log(error);
        }); 

        this.http.get('http://localhost/cs4640/get_category.php').subscribe( response => {
            if (response['message'] == 'Success') {
                this.categories = response['data'];
            }
        }, error => {
            console.log(error);
        })

    }

    // This function enables user to submit the form only after one select a category
    categoryUpdate() {
        var x = <HTMLInputElement>document.getElementById("categories");
        var button = <HTMLInputElement>document.getElementById('submitButton');
        if (x.value == "Category")
            button.disabled = true;
        else
            button.disabled = false;

    }

    // This function is responsible for validating the form input
    validateForm() {
        var x = document.forms["writeForm"]["Title"].value;
        var y = document.forms["writeForm"]["Keywords"].value;
        var z = document.forms["writeForm"]["text"].value;
        if (x == "") {
          alert("Title must be filled out");
          return false;
        }
         else if (y == "") {
            alert("Keywords must be filled out");
            return false;
        }
        else if (z == "") {
            alert("Text must be filled out");
            return false;
        }
        this.articleForm.controls['uid'].setValue(this.userid);
        this.http.post('http://localhost/cs4640/post-article.php',this.articleForm.value).subscribe( data => {
            console.log(data + ' rows affected');
            alert("Thank you for your input!");
            this.articleForm.reset();
        }, error => {
            console.log(error);
        })
        return true;
      }

      // The function will change the character input value after keyup 
      onEnterKey(){
          //var input = String($('#text').val());
          //$('#count_message').html(input.length + " characters");
          var myText = <HTMLInputElement>document.getElementById("text");
          var wordCount = <HTMLInputElement>document.getElementById("wordCount");
          var characters = myText.value.split('');
          wordCount.innerText = String(characters.length);
      }

      // The function will change the header text when a mouse move over it
      changeExpress() {
          document.getElementsByTagName("h1")[0].innerHTML = "Share Your Idea To The World!";
      }
}