import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/guards/auth-guard.service'
import { GuestGuard } from './core/guards/guest-guard.service'
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './shared/components'
import { CreateUpdateBusinessComponent } from '@enexus/flipper-settings'

import { HasSubscribedGuard } from './core/guards/has-subscribed-guard.service'
import { SubscriptionComponent } from './subscription/subscription.component'
import { FlipperInventoryComponent } from '@enexus/flipper-inventory'
import { DashboardComponent } from '@enexus/flipper-dashboard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'pay-now',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setup/business/new',
    component: CreateUpdateBusinessComponent,
    canActivate: [AuthGuard, HasSubscribedGuard],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    // canLoad: [AuthGuard, HasSubscribedGuard, HasBusinessGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
]
//
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
