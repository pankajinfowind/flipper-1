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
              loadChildren: 'app/invoices/invoices.module#InvoicesModule',
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
