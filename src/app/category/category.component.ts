import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Category } from './category';


@Component({
    selector:'pm-category',
    templateUrl:'./category.component.html',
    styleUrls:['category.component.css']
})

export class CategoryComponent implements OnInit {
    user: String;
    categories: Category[];

    constructor(
        private http: HttpClient
    ){}

    ngOnInit() {
        this.http.get('http://localhost/cs4640/get_category.php').subscribe( response => {
            if (response['message'] == 'Success') {
                this.categories = response['data'];
            }
        }, error => {
            console.log(error);
        })
    }

    handleEdit(val: number, text: string) {
        var input = prompt("Please describe the selected category using your own word", text);
        if (input === null) {
            return; //break out of the function early
        }
        this.http.put('http://localhost/cs4640/update_category.php',{ id: val, text: input }).subscribe( response => {
            if (response['message'] == "Success") {
                alert("update Successful!");
                this.refresh();
            }
        }, error => {
            console.log(error);
        })
    }



    refresh() {
        this.categories = [];
        this.http.get('http://localhost/cs4640/get_category.php').subscribe( response => {
            if (response['message'] == 'Success') {
                this.categories = response['data'];
            }
        }, error => {
            console.log(error);
        })
    }

    handleDelete(val : number) {
        let params = new HttpParams().append("id", val);
        this.http.delete('http://localhost/cs4640/delete_category.php',{ params: params }).subscribe( response => {
            if (response['message'] == "Success") {
                alert("Category Deletion Successful!");
                this.refresh();
                return;
            }
            else if(response['message'] == "Error") {
                alert("There are still articles under this category!");
            }
        }, error => {
            console.log(error);
        })
    }
}