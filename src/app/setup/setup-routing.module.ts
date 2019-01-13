import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SetupComponent } from './setup.component';
import { ReasonComponent } from './reasons/reason.component';

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
            { path: 'reasons/:reason', component: ReasonComponent},

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(setupRoutes)],
    exports: [RouterModule]
})
export class SetupRoutingModule {
}
