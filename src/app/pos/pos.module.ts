import {
  NgModule,
  ModuleWithProviders,
  APP_INITIALIZER,
  ErrorHandler
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalePointComponent, BottomSheetOverviewStock } from "./sale-point/sale-point.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { MaterialModule } from "../material/material.module";
import { PosComponent } from "./pos/pos.component";
import { PosRoutingModule } from "./pos-routing.module";
import { UiModule } from "../common/core/ui/ui.module";

import { MasterModule } from "../admin/master/master/master.module";
import { CartItemComponent, CartDialog } from "./cart-item/cart-item.component";
import { ApiPosService } from "./api/api.service";
import { CurrentUser } from "../common/auth/current-user";
import { BootstrapperPos, init_app } from "./bootstrapper.service";
import { HttpErrorHandler } from "../common/core/http/errors/http-error-handler.service";
import { BackendHttpErrorHandler } from "../common/core/http/errors/backend-http-error-handler.service";
import { ravenErrorHandlerFactory } from "../common/core/errors/raven-error-handler";
import { CustomerService } from "../customers/customer.service";
import { HttpClient } from "@angular/common/http";
import { ModelFactory } from "ngx-model";
import { OrdersModule } from '../orders/orders.module';
import { PayModule } from '../pay/pay.module';
import { CustomersModule } from '../customers/customers.module';

@NgModule({
  declarations: [
    SalePointComponent,
    SessionsComponent,
    PosComponent,
    CartItemComponent,
    CartDialog,
    BottomSheetOverviewStock
  ],
  imports: [CommonModule, MaterialModule, PosRoutingModule, UiModule, OrdersModule,
     PayModule,
      CustomersModule,
    ],
  exports: [SessionsComponent, SalePointComponent, PosComponent, CartDialog,BottomSheetOverviewStock],
  entryComponents: [CartDialog,BottomSheetOverviewStock],
  providers: [ApiPosService, ModelFactory]
})
export class PosModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PosModule,
      providers: [
        CustomerService,
        HttpClient,
        CurrentUser,
        BootstrapperPos,
        {
          provide: HttpErrorHandler,
          useClass: BackendHttpErrorHandler
        },
        {
          provide: APP_INITIALIZER,
          useFactory: init_app,
          deps: [BootstrapperPos, CurrentUser],
          multi: true
        },
        {
          provide: ErrorHandler,
          useFactory: ravenErrorHandlerFactory,
          deps: [ApiPosService, CurrentUser, CustomerService]
        }
      ]
    };
  }
}
//ApiPosService
