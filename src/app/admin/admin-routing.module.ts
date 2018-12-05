import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {},
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
            },
            { path: 'dashboard', component: DashboardComponent},
            {
              path: 'master',
              loadChildren: 'app/admin/master/master/master.module#MasterModule',
              canActivate: [AuthGuard]
            },
            {
              path: 'stock',
              loadChildren: 'app/stock/stock.module#StockModule',
              canActivate: [AuthGuard]
            },
            {
              path: 'pos',
              loadChildren: 'app/pos/pos.module#PosModule',
              canActivate: [AuthGuard]
            }

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
