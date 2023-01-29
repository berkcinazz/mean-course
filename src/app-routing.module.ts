import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./app/auth/login/login.component";
import { SignupComponent } from "./app/auth/signup/signup.component";
import { PostCreateComponent } from "./app/posts/post-create/post-create.component";
import { PostListComponent } from "./app/posts/post-list/post-list.component";


const routes: Routes = [
    { path: "", component: PostListComponent },
    { path: "create", component: PostCreateComponent },
    {path : "edit/:postId", component: PostCreateComponent},
    { path: "signup", component: SignupComponent },
    { path: "login", component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}