import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../common/guards/auth-guard.service';

const routes: Routes = [
      {path: 'pos', loadChildren: 'app/pos/pos.module#PosModule', canActivate: [AuthGuard]}            
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CashierRoutingModule {
}
