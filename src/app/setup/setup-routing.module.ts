import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SetupComponent } from './setup.component';
import { ReasonComponent } from './reasons/reason.component';
import { CustomerTypeComponent } from './customerType/customertype.component';
import { ExpirationSettingComponent } from './expiration_setting/expiration_setting.component';
import { ItemsComponent } from '../admin/master/items/items.component';
import { CategoriesComponent } from '../admin/master/categories/categories.component';
import { BrandComponent } from '../admin/master/brands/brand.component';
import { AddItemComponent } from '../admin/master/items/add-item/add-item.component';

const setupRoutes: Routes = [
    {
        path: '',
        component: SetupComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'item',
                pathMatch: 'full',
            },
            { path: 'customertype', component: CustomerTypeComponent },
            { path: 'tax-rate', component: TaxRatesComponent },
            { path: 'reason', component: ReasonComponent},
            { path: 'expiration_setting', component: ExpirationSettingComponent},
            { path: 'item', component: ItemsComponent },
            { path: 'category', component: CategoriesComponent },
            { path: 'brand', component: BrandComponent },
            { path: 'add-item', component: AddItemComponent }


        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(setupRoutes)],
    exports: [RouterModule]
})
export class SetupRoutingModule {
}
