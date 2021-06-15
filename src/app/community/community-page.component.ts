import { Component, OnInit } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
    selector:'pm-community',
    templateUrl:'./community-page.component.html',
    styleUrls:['community-page.component.css']
})


export class CommunityComponent implements OnInit {
    articles: any[];
    image_dict: any;
    @SessionStorage('userid')
    userid: number;

    constructor(
        private http: HttpClient,
    ){
        this.image_dict = {
            0: '../../assets/images/bernie-meme.jpg',
            1: '../../assets/images/ncaa_championship_ss_04_0.jpg',
            2: '../../assets/images/spongebob2.jpg',
            3: '../../assets/images/success_kid.png',
        }
    }
    
    ngOnInit() {
        let param = new HttpParams().append("id",this.userid);
        this.http.get('http://localhost/cs4640/get_community_article.php',{params: param}).subscribe( response => {
            if(response['message'] == 'Success') {
                this.articles = response['data'];
                for( let i =0; i< this.articles.length; i++) {
                    switch(this.articles[i]['catename']) {
                        case ('Politics'): {
                            this.articles[i]['imagePath'] = this.image_dict[0];
                            break;
                        }
                        case ('Sports'): {
                            this.articles[i]['imagePath'] = this.image_dict[1];
                            break;
                        }
                        case ('Opinion'): {
                            this.articles[i]['imagePath'] = this.image_dict[2];
                            break;
                        }
                        case ('General'): {
                            this.articles[i]['imagePath'] = this.image_dict[3];
                            break;
                        }
                    }
                }
            }
            else {
                alert(response['data']);
            }
        }, error => {
            console.log(error);
        })
    }

}
