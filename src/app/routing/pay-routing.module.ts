import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { PayComponent } from '../pay/pay/pay.component';

const payRoutes: Routes = [
    {
        path: '',
        component: PayComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'pay',
                pathMatch: 'full',
            },
            { path: 'pay', component: PayComponent }
      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(payRoutes)],
    exports: [RouterModule]
})
export class PayRoutingModule {
}
