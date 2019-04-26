import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { SetupRoutingModule } from './setup-routing.module';
import { DetailsModule } from '../details/details.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../common/core/ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '../common/core/http/http.module';
import { ApiTaxRateService } from './tax-rates/api/api.service';
import { NoEntryFoundSetUpComponent } from './messages/no-entry-found/no-entry-found.component';
import { ReasonComponent } from './reasons/reason.component';
import { ApiReasonService } from './reasons/api/api.service';
import { CustomerTypeComponent } from './customerType/customertype.component';
import { ApiCustomerTypeService } from './customerType/api/api.service';
import { ExpirationSettingComponent } from './expiration_setting/expiration_setting.component';
import { ApiExpirationSettingService } from './expiration_setting/api/api.service';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { NavService } from './nav-service';
import { MasterModule } from '../admin/master/master/master.module';
import { CrupdateCustomerTypeModalComponent } from './customerType/crupdate-customet-type-modal/crupdate-customer-type-modal.component';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { CrupdateTaxRateModalComponent } from './tax-rates/crupdate-tax-rate-modal/crupdate-tax-rate-modal.component';
import { CrupdateReasonModalComponent } from './reasons/crupdate-reason-modal/crupdate-reason-modal.component';
import { ReasonDataTableComponent } from './reasons/reason-data-table/reason-data-table.component';
import { CrupdatePeriodModalComponent } from './expiration_setting/crupdate-period-modal/crupdate-period-modal.component';
import { SelectTaxrateModalComponent } from './tax-rates/select-taxrate-modal/select-taxrate-modal.component';
import { SelectCustomerTypeModalComponent } from './select-customer-type-modal/select-customer-type-modal.component';
import { SelectReasonModalComponent } from './reasons/select-reason-modal/select-reason-modal.component';

@NgModule({
  declarations: [ReasonComponent,SetupComponent, TaxRatesComponent,NoEntryFoundSetUpComponent,CustomerTypeComponent,ExpirationSettingComponent, MenuListItemComponent,CrupdateCustomerTypeModalComponent, CrupdateTaxRateModalComponent, CrupdateReasonModalComponent, ReasonDataTableComponent, CrupdatePeriodModalComponent, SelectTaxrateModalComponent, SelectCustomerTypeModalComponent, SelectReasonModalComponent],
  exports: [ReasonComponent,SetupComponent, TaxRatesComponent,ExpirationSettingComponent,NoEntryFoundSetUpComponent,CustomerTypeComponent,CrupdateCustomerTypeModalComponent,CrupdateTaxRateModalComponent,SelectTaxrateModalComponent,SelectCustomerTypeModalComponent,SelectReasonModalComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    DetailsModule,
    MaterialModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MasterModule,
    DataTableModule
  ],
  providers: [
    ApiTaxRateService,
    ApiReasonService,
    ApiCustomerTypeService,
    ApiExpirationSettingService,
    NavService
  ],
  entryComponents: [
    CrupdateCustomerTypeModalComponent,
    CrupdateTaxRateModalComponent,
    CrupdateReasonModalComponent,
    CrupdatePeriodModalComponent,
    SelectTaxrateModalComponent,
    SelectCustomerTypeModalComponent,
    SelectReasonModalComponent
  ]
})
export class SetupModule {

}
