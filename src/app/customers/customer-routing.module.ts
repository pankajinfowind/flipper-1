import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { ListComponent } from './list/list.component';

const customerRoutes: Routes = [
    {
        path: '',
        component: ListComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'lists',
                pathMatch: 'full',
            },
            { path: 'lists', component: ListComponent },
      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(customerRoutes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {
}
