import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PosComponent } from './pos/pos.component';
import { AuthGuard } from '../common/guards/auth-guard.service';

const posRoutes: Routes = [
    {
        path: '',
        component: PosComponent,canActivate: [AuthGuard],

        children: [
          {
            path: '',
            redirectTo: 'pos',
            pathMatch: 'full',
            },
            { path: 'pos', component: PosComponent}

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(posRoutes)],
    exports: [RouterModule]
})
export class PosRoutingModule {
}
