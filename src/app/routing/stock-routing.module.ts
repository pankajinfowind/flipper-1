import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { StockComponent } from '../stock/stock.component';
import { StockMovementComponent } from '../stock/stock-movement/stock-movement.component';
import { StockTableComponent } from '../stock/stock-table/stock-table.component';
import { ExpiredStockComponent } from '../stock/expired-stock/expired-stock.component';

const stockRoutes: Routes = [
    {
        path: '',
        component: StockComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {},
        children: [
          {
          path: '',
          redirectTo: 'available',
          pathMatch: 'full',
          },
          { path: 'stock-control', component: StockTableComponent },
          { path: 'stock-order', component: StockTableComponent },
          { path: 'stockmovement', component: StockMovementComponent },
          { path: 'expireditem', component: ExpiredStockComponent}

    ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(stockRoutes)],
    exports: [RouterModule]
})
export class StockRoutingModule {
}
