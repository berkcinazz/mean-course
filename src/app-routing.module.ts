import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './app/posts/post-create/post-create.component';
import { PostListComponent } from './app/posts/post-list/post-list.component';
import { AuthGuard } from './app/auth/auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate:[AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate:[AuthGuard] },
  { path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}