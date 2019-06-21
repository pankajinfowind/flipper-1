import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SetCompanyComponent } from './set-company/set-company.component';
import { CustomizeInvoiceComponent } from './customize-invoice/customize-invoice.component';
import { SettingRoutingModule } from '../routing/setting-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../common/core/ui/ui.module';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { BusinessModule } from '../business/business.module';
import { CrupdateInvoiceCustomizationComponent } from './customize-invoice/crupdate-invoice-customization/crupdate-invoice-customization.component';
import { NgxModelModule } from 'ngx-model';
import { PreviewInvoiceCustomizedComponent } from './customize-invoice/preview-invoice-customized/preview-invoice-customized.component';
import { MasterModule } from '../admin/master/master/master.module';
import { UsersComponent } from './users/users.component';
import { CrupdateUserModalComponent } from './users/crupdate-user-modal/crupdate-user-modal.component';

@NgModule({
  declarations: [CrupdateUserModalComponent,SettingsComponent, SetCompanyComponent, CustomizeInvoiceComponent, CrupdateInvoiceCustomizationComponent,PreviewInvoiceCustomizedComponent, UsersComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DataTableModule,
    BusinessModule,
    NgxModelModule,
    MasterModule
  ],
  entryComponents: [CrupdateUserModalComponent],
  exports:[SettingsComponent, SetCompanyComponent, CustomizeInvoiceComponent,PreviewInvoiceCustomizedComponent,UsersComponent]
})

export class SettingsModule { }
