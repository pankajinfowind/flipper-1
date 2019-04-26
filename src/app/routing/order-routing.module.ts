import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { OrderListComponent } from '../orders/orders/order-list/order-list.component';
import { OrdersComponent } from '../orders/orders/orders.component';
import { OrderOrderedComponent } from '../orders/order-ordered/order-ordered.component';
import { OrderCompleteComponent } from '../orders/order-complete/order-complete.component';
import { OrderHeldComponent } from '../orders/order-held/order-held.component';

const orderRoutes: Routes = [
    {
        path: '',
        component: OrdersComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'order-pending',
                pathMatch: 'full',
            },
            { path: 'order-pending', component: OrderOrderedComponent },
            { path: 'order-complete', component: OrderCompleteComponent },
            { path: 'order-held', component: OrderHeldComponent },

      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(orderRoutes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
