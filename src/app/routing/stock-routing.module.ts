import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { StockComponent } from '../stock/stock.component';
import { ExpiredStockComponent } from '../stock/expired-stock/expired-stock.component';
import { AvailabeStockComponent } from '../stock/availabe-stock/availabe-stock.component';
import { StockSoldOutComponent } from '../stock/stock-sold-out/stock-sold-out.component';
import { StockLowerComponent } from '../stock/stock-lower/stock-lower.component';
import { StockMovementComponent } from '../stock/stock-movement/stock-movement.component';

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
          { path: 'available', component: AvailabeStockComponent },
          { path: 'stockout', component: StockSoldOutComponent },
          { path: 'lowerstock', component: StockLowerComponent },
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
