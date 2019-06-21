import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { RedirectComponent } from '../redirect/redirect.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { AvailabeStockComponent } from '../stock/availabe-stock/availabe-stock.component';
import { StockSoldOutComponent } from '../stock/stock-sold-out/stock-sold-out.component';
import { StockLowerComponent } from '../stock/stock-lower/stock-lower.component';
import { StockMovementComponent } from '../stock/stock-movement/stock-movement.component';
import { ExpiredStockComponent } from '../stock/expired-stock/expired-stock.component';
import { ItemsComponent } from './master/items/items.component';
import { CategoriesComponent } from './master/categories/categories.component';
import { BrandComponent } from './master/brands/brand.component';
import { AddItemComponent } from './master/items/add-item/add-item.component';
import { SetCompanyComponent } from '../settings/set-company/set-company.component';
import { CustomizeInvoiceComponent } from '../settings/customize-invoice/customize-invoice.component';
import { CrupdateInvoiceCustomizationComponent } from '../settings/customize-invoice/crupdate-invoice-customization/crupdate-invoice-customization.component';
import { BranchComponent } from './master/branch/branch.component';
import { UsersComponent } from '../settings/users/users.component';


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
            {path: 'analytics', component: AnalyticsComponent},
            {path: 'pos', loadChildren: 'app/pos/pos.module#PosModule', canActivate: [AuthGuard]},
              {
                path: 'setup', children: [
                      { path: 'item', component: ItemsComponent },
                      { path: 'category', component: CategoriesComponent },
                      { path: 'brand', component: BrandComponent },
                      { path: 'add-item', component: AddItemComponent }
                  ]
              },
              {
                path: 'stock', children: [
                      { path: 'available', component: AvailabeStockComponent },
                      { path: 'stockout', component: StockSoldOutComponent },
                      { path: 'lowerstock', component: StockLowerComponent },
                      { path: 'stockmovement', component: StockMovementComponent },
                      { path: 'expireditem', component: ExpiredStockComponent}
                  ]
              },{
              path: 'sales', children: [
              {
                path: 'invoices',
                loadChildren: 'app/invoices/invoices.module#InvoicesModule',
                canActivate: [AuthGuard]
              },
              {
                path: 'customers',
                loadChildren: 'app/customers/customers.module#CustomersModule',
                canActivate: [AuthGuard]
              }],
              }
              ,{
                path: 'settings', children: [
              { path: 'set-company', component: SetCompanyComponent },
              { path: 'customize-invoice', component: CustomizeInvoiceComponent },
              { path: 'new-customize-invoice', component: CrupdateInvoiceCustomizationComponent },
              { path: 'branches', component: BranchComponent },
              { path: 'users', component: UsersComponent },
              
            ]
          
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
