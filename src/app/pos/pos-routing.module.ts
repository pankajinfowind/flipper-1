import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PosComponent } from './pos/pos.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SalePointComponent } from './sale-point/sale-point.component';

const posRoutes: Routes = [
    {

      path: '',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      data: {},
      component: PosComponent,

        children: [
          {
            path: '',
            redirectTo: 'sales',
            pathMatch: 'full',
            },
            { path: 'sales', component: SalePointComponent
            }

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(posRoutes)],
    exports: [RouterModule]
})
export class PosRoutingModule {
}
