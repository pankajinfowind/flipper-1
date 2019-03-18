import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { AuthGuard } from '../common/guards/auth-guard.service';

const invoiceRoutes: Routes = [
    {
        path: '',
        component: InvoiceComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'lists',
                pathMatch: 'full',
            },
            { path: 'lists', component: InvoiceComponent },
      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(invoiceRoutes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule {
}
