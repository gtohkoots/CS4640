import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';


@Component({
    selector:'pm-post',
    templateUrl:'./article-post.component.html',
    styleUrls:['article-post.component.css']
})

export class PostArticleComponent implements OnInit {
    ngOnInit() {
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
    validateForm(form: NgForm) {
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
        console.log(form.value);
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