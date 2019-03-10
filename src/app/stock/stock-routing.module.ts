import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { AvailabeStockComponent } from './availabe-stock/availabe-stock.component';
import { NewStockComponent } from './new-stock/new-stock.component';
import { StockSoldOutComponent } from './stock-sold-out/stock-sold-out.component';
import { StockComponent } from './stock.component';
import {ReportManagerComponent} from "./report-manager/report-manager.component";
import { StockLowerComponent } from './stock-lower/stock-lower.component';
import { ExpiredStockComponent } from './expired-stock/expired-stock.component';

const stockRoutes: Routes = [
    {
        path: '',
        component: StockComponent,canActivate: [AuthGuard],

        children: [
          {
            path: '',
            redirectTo: 'available',
            pathMatch: 'full',
            },
            { path: 'available', component: AvailabeStockComponent},
            { path: 'new', component: NewStockComponent},
            { path: 'stockout', component: StockSoldOutComponent},
            { path: 'lowerstock', component: StockLowerComponent},
            { path: 'expireditem', component: ExpiredStockComponent},
            { path: 'report', component: ReportManagerComponent}
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(stockRoutes)],
    exports: [RouterModule]
})
export class StockRoutingModule {
}
