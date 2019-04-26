import {
  NgModule,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalePointComponent } from "./sale-point/sale-point.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { MaterialModule } from "../material/material.module";
import { PosComponent } from "./pos/pos.component";
import { PosRoutingModule } from "./pos-routing.module";
import { UiModule } from "../common/core/ui/ui.module";

import { CartItemComponent, CartDialog } from "./cart-item/cart-item.component";
import { ApiPosService } from "./api/api.service";

import {  HttpClientModule } from "@angular/common/http";
import { ModelFactory } from "ngx-model";
import { PayModule } from '../pay/pay.module';
import { CustomersModule } from '../customers/customers.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { PosInfiniteScrollDirective } from './pos/pos-infinite-scroll.directive';
import { HttpModule } from '../common/core/http/http.module';
import { NgxsModule } from '@ngxs/store';
import { ItemCategoriesComponent } from './pos/load-item/item-categories/item-categories.component';
import { PosCateoriesState } from '../store/states/PosCategoryStates';
import { PosProductsComponent } from './pos/load-item/pos-products/pos-products.component';
import { PosStockStates } from '../store/states/PosStockStates';
import { ListItemHeaderComponent } from './pos/list-item-header/list-item-header.component';
import { PosOrderState } from '../store/states/PosOrderStates';
import { BottomSheetOverviewStock } from './pos/boottom-sheet-stock-movement/bottom-sheet-of-stock.componet';
import { SelectCustomerModelComponent } from './select-customer-model/select-customer-model.component';
@NgModule({
  declarations: [
    SalePointComponent,
    SessionsComponent,
    PosComponent,
    CartItemComponent,
    ItemCategoriesComponent,
    CartDialog,
    BottomSheetOverviewStock,
    PosInfiniteScrollDirective,
    PosProductsComponent,
    ListItemHeaderComponent,
    SelectCustomerModelComponent
  ],
  imports: [
    CommonModule,
     MaterialModule,
      PosRoutingModule,
      UiModule,
      InvoicesModule,
      CustomersModule,
      HttpClientModule,
      HttpModule,

      NgxsModule.forFeature([PosCateoriesState,PosStockStates,PosOrderState]),
    ],
  exports: [
    SessionsComponent,
    SalePointComponent,
    PosComponent,
    CartDialog,
    ItemCategoriesComponent,
    BottomSheetOverviewStock,
    PosInfiniteScrollDirective
  ],
  entryComponents: [CartDialog,BottomSheetOverviewStock],
  providers: [ApiPosService]
})
export class PosModule {

}
