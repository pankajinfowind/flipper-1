import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SetupComponent } from './setup.component';

const setupRoutes: Routes = [
    {
        path: '',
        component: SetupComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'tax-rate',
                pathMatch: 'full',
            },
            { path: 'tax-rate', component: TaxRatesComponent },

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(setupRoutes)],
    exports: [RouterModule]
})
export class SetupRoutingModule {
}
