import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { GuestGuard } from "../guards/guest-guard.service";
import { ChangePasswordComponent } from "./reset-password/change-password/change-password.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [GuestGuard] },
  {
    path: "password/reset/:token",
    component: ChangePasswordComponent,
    canActivate: [GuestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
