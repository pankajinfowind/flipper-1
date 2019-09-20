import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { RedirectComponent } from '../redirect/redirect.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
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
import { UserBranchesComponent } from '../settings/user-branches/user-branches.component';
import { ReceiptSettingComponent } from '../settings/receipt-setting/receipt-setting.component';
import { CustomerTypeComponent } from '../setup/customerType/customertype.component';
import { TaxRatesComponent } from '../setup/tax-rates/tax-rates.component';
import { ReasonComponent } from '../setup/reasons/reason.component';
import { ExpirationSettingComponent } from '../setup/expiration_setting/expiration_setting.component';
import { StockTableComponent } from '../stock/stock-table/stock-table.component';
import { SuppliersComponent } from './master/suppliers/suppliers.component';
import { StockOrdersComponent } from '../stock/stock-orders/stock-orders.component';
import { SalesReportsComponent } from '../reports/sales-reports/sales-reports.component';
import { ProductsSoldReportsComponent } from '../reports/products-sold-reports/products-sold-reports.component';
import { BestSellerReportsComponent } from '../reports/best-seller-reports/best-seller-reports.component';


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
            {path: 'pos', 
            loadChildren: () => import('./../pos/pos.module').then(m => m.PosModule),
            canActivate: [AuthGuard]},
              {
                path: 'setup', children: [
                      { path: 'item', component: ItemsComponent },
                      { path: 'category', component: CategoriesComponent },
                      { path: 'brand', component: BrandComponent },
                      { path: 'add-item', component: AddItemComponent },
                      { path: 'supplier', component: SuppliersComponent },
                  ]
              },
              {
                path: 'stock', children: [
                      { path: 'stock-control', component: StockTableComponent },
                      { path: 'stockmovement', component: StockMovementComponent },
                      { path: 'expireditem', component: ExpiredStockComponent},
                      { path: 'orders', component: StockOrdersComponent},
                  ]
              },
              {
                path: 'reports', children: [
                      { path: 'sales', component: SalesReportsComponent },
                      { path: 'product-sold', component: ProductsSoldReportsComponent },
                      { path: 'best-seller', component: BestSellerReportsComponent},
                  ]
              },
              {
              path: 'sales', children: [
              {
                path: 'invoices',
                loadChildren: ()=> import('./../../app/invoices/invoices.module').then(m=>m.InvoicesModule),
                canActivate: [AuthGuard]
              },
              {
                path: 'customers',
                loadChildren: () => import('./../../app/customers/customers.module').then(m => m.CustomersModule),
                canActivate: [AuthGuard]
              }],
              }
              ,{
                path: 'settings', children: [
              { path: 'set-company', component: SetCompanyComponent },
              { path: 'receipt-setting', component: ReceiptSettingComponent },
              { path: 'customize-invoice', component: CustomizeInvoiceComponent },
              { path: 'new-customize-invoice', component: CrupdateInvoiceCustomizationComponent },
              { path: 'branches', component: BranchComponent },
              { path: 'users', component: UsersComponent },
              { path: 'user-branches', component: UserBranchesComponent },
              { path: 'customertype', component: CustomerTypeComponent },
              { path: 'tax-rate', component: TaxRatesComponent },
              { path: 'reason', component: ReasonComponent},
              { path: 'expiration_setting', component: ExpirationSettingComponent},
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
