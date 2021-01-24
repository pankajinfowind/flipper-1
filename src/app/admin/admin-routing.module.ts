import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../core/guards/auth-guard.service'
import { PageNotFoundComponent } from '../shared/components'
import { AdminComponent } from './admin/admin.component'
import { HasSubscribedGuard } from '../core/guards/has-subscribed-guard.service'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard, HasSubscribedGuard],
    canActivateChild: [AuthGuard, HasSubscribedGuard],
    children: [

      {
        path: '',
        redirectTo: 'inventory',
        pathMatch: 'full',
      },
      {

        path: 'analytics',
        loadChildren: () => import('@enexus/flipper-dashboard').then(m => m.FlipperDashboardModule),
        // canLoad: [AuthGuard, HasSubscribedGuard],
      },
      {
        path: 'pos',
        loadChildren: () => import('@enexus/flipper-pos').then(m => m.FlipperPosModule),
        // canLoad: [AuthGuard, HasSubscribedGuard],
      },
      {
        path: 'settings',
        loadChildren: () => import('./../settings/settings.module').then(m => m.SettingsModule),
        // canLoad: [AuthGuard, HasSubscribedGuard],
      },
      {
        path: 'inventory',
        loadChildren: () => import('@enexus/flipper-inventory').then(m => m.FlipperInventoryModule),
        // canLoad: [AuthGuard, HasSubscribedGuard],
      },
      {
        path: 'transactions',
        loadChildren: () => import('./../transactions/transactions.module').then(m => m.TransactionsModule),
        // canLoad: [AuthGuard, HasSubscribedGuard],
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
