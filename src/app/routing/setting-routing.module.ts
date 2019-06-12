import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SettingsComponent } from '../settings/settings.component';
import { SetCompanyComponent } from '../settings/set-company/set-company.component';
import { CustomizeInvoiceComponent } from '../settings/customize-invoice/customize-invoice.component';
import { CrupdateInvoiceCustomizationComponent } from '../settings/customize-invoice/crupdate-invoice-customization/crupdate-invoice-customization.component';
import { BranchComponent } from '../admin/master/branch/branch.component';
const settingRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {},
        children: [
          {
          path: '',
          redirectTo: 'set-company',
          pathMatch: 'full',
          },
          { path: 'set-company', component: SetCompanyComponent },
          { path: 'customize-invoice', component: CustomizeInvoiceComponent },
          { path: 'new-customize-invoice', component: CrupdateInvoiceCustomizationComponent },
          { path: 'branch', component: BranchComponent }
    ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(settingRoutes)],
    exports: [RouterModule]
})

export class SettingRoutingModule { }
