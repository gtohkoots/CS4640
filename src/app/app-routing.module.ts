import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article/article-list.component';
import { LoginComponent } from './login/login.component';
import { PostArticleComponent } from './article/article-post.component';

const routes: Routes = [
  { path: 'article', component: ArticleListComponent},
  { path: 'article/post', component: PostArticleComponent},
  { path: '', component: LoginComponent},
  { path: '**', redirectTo: '',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
