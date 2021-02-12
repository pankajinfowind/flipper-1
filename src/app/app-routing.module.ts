import { HasSubscribedGuard } from './core/guards/has-subscribed-guard.service';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FlipperPosComponent } from '@enexus/flipper-pos'
import { AuthGuard } from './core/guards/auth-guard.service'
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './shared/components'
import { DashboardComponent } from '@enexus/flipper-dashboard'
import { SubscriptionComponent } from './subscription/subscription.component'
import { CreateProductComponent, ListProductsComponent, ProductsComponent } from '@enexus/flipper-inventory';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pay-now',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard,HasSubscribedGuard],
  },
  {
    path: 'pos',
    component: FlipperPosComponent,
    canActivate: [AuthGuard,HasSubscribedGuard]
  },
  // {
  //   path: 'inventory',
  //   component: ProductsComponent,
  //   canActivate: [AuthGuard,HasSubscribedGuard]
  // },
  //
  {
    path: 'inventory',
    component: ListProductsComponent,
    // canActivate: [AuthGuard,HasSubscribedGuard]
  },
  {
    path: 'add/product',
    component: CreateProductComponent,
    canActivate: [AuthGuard,HasSubscribedGuard]
  },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('@enexus/flipper-settings').then(m => m.FlipperSettingsModule),
  //   canActivate: [AuthGuard]
  // },
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
