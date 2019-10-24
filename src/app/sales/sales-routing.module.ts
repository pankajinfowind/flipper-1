import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SalesComponent } from './sales/sales.component';

const salesRoutes: Routes = [
    {

      path: '',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      data: {},
      component: SalesComponent,

        children: [
          {
            path: '',
            redirectTo: 'invoices',
            pathMatch: 'full',
            },
            {
              path: 'invoices',
              loadChildren: () => import('./../../app/invoices/invoices.module').then(m => m.InvoicesModule),
              canActivate: [AuthGuard]
            },
            {
              path: 'customers',
              loadChildren: () => import('./../../app/customers/customers.module').then(m => m.CustomersModule),
              canActivate: [AuthGuard]
            },

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(salesRoutes)],
    exports: [RouterModule]
})
export class SalesRoutingModule {
}
