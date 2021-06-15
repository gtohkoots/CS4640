import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article/article-list.component';
import { LoginComponent } from './login/login.component';
import { PostArticleComponent } from './article/article-post.component';
import { CategoryComponent } from './category/category.component';
import { SubscribeComponent } from './subscription/subscription.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { CommunityComponent } from './community/community-page.component';

const routes: Routes = [
  { path: '', component: SubscribeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'article', component: ArticleListComponent},
  { path: 'article/post', component: PostArticleComponent},
  { path: 'article/:id', component: ArticleDetailComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'community', component: CommunityComponent},
  { path: '**', redirectTo: '',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
