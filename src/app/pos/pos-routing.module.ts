import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PosComponent } from './pos/pos.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SalePointComponent } from './sale-point/sale-point.component';
import { ItemCategoriesComponent } from './pos/load-item/item-categories/item-categories.component';
import { PosProductsComponent } from './pos/load-item/pos-products/pos-products.component';

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
            redirectTo: 'till-categories',
            pathMatch: 'full',
            },
            {
              path: 'till-categories',component:ItemCategoriesComponent,
            },
            {
              path: 'till-category-items/:categoryId', component: PosProductsComponent
            },

            {
            path: 'till-orders',
            loadChildren: 'app/orders/orders.module#OrdersModule',
            canActivate: [AuthGuard]
            },
            {
              path: 'till-customers',
              loadChildren: 'app/customers/customers.module#CustomersModule',
              canActivate: [AuthGuard]
            },
            {
              path: 'till-pay',
              loadChildren: 'app/pay/pay.module#PayModule',
              canActivate: [AuthGuard]
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
