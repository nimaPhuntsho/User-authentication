import { AuthGuard } from "./auth.guard";
import { AccountComponent } from "./components/account/account.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SigninComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
