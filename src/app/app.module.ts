import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ArticleListComponent } from './article/article-list.component';
import { HeaderComponent } from './shared/header.component';
import { LoginComponent } from './login/login.component';
import { PostArticleComponent } from './article/article-post.component';
import { CategoryComponent } from './category/category.component';
import { SubscribeComponent } from './subscription/subscription.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { CommunityComponent } from './community/community-page.component';
import { CommentComponent } from './comment/comment.component';
import { CookieService } from 'ngx-cookie-service';
import { NgxWebstorageModule } from 'ngx-webstorage';


@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HeaderComponent,
    LoginComponent,
    PostArticleComponent,
    CategoryComponent,
    SubscribeComponent,
    ArticleDetailComponent,
    CommunityComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '731940911048-t47qrngm675lf6sdaiejrqq02cgi3mbr.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    CookieService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
