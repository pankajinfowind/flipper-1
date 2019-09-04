import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./common/auth/login/login.component";
import { GuestGuard } from "./common/guards/guest-guard.service";
import { AuthGuard } from "./common/guards/auth-guard.service";
import { RedirectComponent } from "./redirect/redirect.component";
import { NewBusinessComponent } from "./business/new-business/new-business.component";
import { CheckInternetComponent } from './check-internet/check-internet.component';
import { SwitchBranchModelComponent } from './common/core/ui/switch-branch/switch-branch-model/switch-branch-model.component';

const routes: Routes = [
    {path: 'no-internet', component: CheckInternetComponent, canActivate: [GuestGuard]},
    {path: '', pathMatch: 'full', component: RedirectComponent, canActivate: [AuthGuard]},
    {path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard]},
    {path: 'switch-branch', component: SwitchBranchModelComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
    {path: 'customer', component: NewBusinessComponent, canActivate: [AuthGuard]},
    {path: 'admin', loadChildren: '../app/admin/admin.module#AdminModule', canLoad: [AuthGuard]},
    {path: 'cashier', loadChildren: '../app/cashier/cashier.module#CashierModule', canLoad: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
