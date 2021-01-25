import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FlipperPosComponent } from '@enexus/flipper-pos'
import { AuthGuard } from './core/guards/auth-guard.service'
import { GuestGuard } from './core/guards/guest-guard.service'
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './shared/components'
import { DashboardComponent } from '@enexus/flipper-dashboard'
import { SubscriptionComponent } from './subscription/subscription.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'analytics',
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
    path: 'analytics',
    component: DashboardComponent,
  },
  {
    path: 'pos',
    component: FlipperPosComponent,
  },
  {
    path: 'admin',
    component: FlipperPosComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
]

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
