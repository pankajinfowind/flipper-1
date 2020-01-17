import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { PageNotFoundComponent } from '../shared/components';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'analytics',
            pathMatch: 'full',
        },
          {
            path: 'analytics',
            loadChildren: () => import('./../dashboard/dashboard.module').then(m => m.DashboardModule),
            canLoad: [AuthGuard]
          },
          {
            path: 'pos',
            loadChildren: () => import('./../pos/pos.module').then(m => m.PosModule),
            canLoad: [AuthGuard]
          },
          {
            path: 'settings',
            loadChildren: () => import('./../settings/settings.module').then(m => m.SettingsModule),
            canLoad: [AuthGuard]
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
