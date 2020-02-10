import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { PageNotFoundComponent } from '../shared/components';
import { AdminComponent } from './admin/admin.component';
import { RedirectGuard } from '../core/guards/redirect-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard,RedirectGuard],
    canActivateChild: [AuthGuard,RedirectGuard],
    children: [
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
      {
        path: 'analytics',
        loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard,RedirectGuard]
      },
      {
        path: 'pos',
        loadChildren: () => import('./../pos/pos.module').then(m => m.PosModule),
        canLoad: [AuthGuard,RedirectGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./../settings/settings.module').then(m => m.SettingsModule),
        canLoad: [AuthGuard,RedirectGuard]
      },
      {
        path: 'inventory',
        loadChildren: () => import('./../inventory/inventory.module').then(m => m.InventoryModule),
        canLoad: [AuthGuard,RedirectGuard]
      },
      {
        path: 'transactions',
        loadChildren: () => import('./../transactions/transactions.module').then(m => m.TransactionsModule),
        canLoad: [AuthGuard,RedirectGuard]
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];
//
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
