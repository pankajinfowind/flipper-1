import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from '../guards/guest-guard.service';
import { RegisterComponent } from './register/register.component';
import { DisableRouteGuard } from '../guards/disable-route-guard.service';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    {
        path: 'sign-up',
        component: RegisterComponent,
        canActivate: [GuestGuard, DisableRouteGuard]
    },
    // {
    //     path: 'forgot-password',
    //     component: ForgotPasswordComponent,
    //     canActivate: [GuestGuard]
    // },
    {
        path: 'password/reset/:token',
        component: ChangePasswordComponent,
        canActivate: [GuestGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
