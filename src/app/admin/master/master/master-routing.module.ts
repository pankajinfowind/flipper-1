import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { AuthGuard } from '../../../common/guards/auth-guard.service';
import { ItemsComponent } from '../items/items.component';
import { CategoriesComponent } from '../categories/categories.component';
import { BrandComponent } from '../brands/brand.component';
import { AddItemComponent } from '../items/add-item/add-item.component';

const masterRoutes: Routes = [
    {
        path: '',
        component: MasterComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'item',
                pathMatch: 'full',
            },
            { path: 'item', component: ItemsComponent },
            { path: 'category', component: CategoriesComponent },
            { path: 'brand', component: BrandComponent },
            { path: 'add-item', component: AddItemComponent }

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(masterRoutes)],
    exports: [RouterModule]
})
export class MasterRoutingModule {
}
