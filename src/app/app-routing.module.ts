import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./common/auth/login/login.component";
import { NewBusinessComponent } from "./business/new-business/new-business.component";

const routes: Routes = [
  {
    path: "",
    component: NewBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
