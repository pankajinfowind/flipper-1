import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';
import { GuestGuard } from './core/guards/guest-guard.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/components';
import { HasBusinessGuard } from './core/guards/has-business-guard.service';
import { CreateUpdateBusinessComponent } from '@enexus/flipper-settings';
import { CreateProductComponent } from '@enexus/flipper-inventory';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, canActivate: [GuestGuard]
  },
  {
    path: 'setup/business/new', component: CreateUpdateBusinessComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add/product', component: CreateProductComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard, HasBusinessGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
//
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  }
  )],
  exports: [RouterModule],
})
export class AppRoutingModule { }
