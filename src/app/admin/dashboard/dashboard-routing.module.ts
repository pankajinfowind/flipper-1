import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../common/guards/auth-guard.service';
import { AnalyticsComponent } from './analytics/analytics.component';
const dashboardRoutes: Routes = [
    {
            path: '',
            component: DashboardComponent, canActivate: [AuthGuard],

            children: [
                {
                    path: '',
                    redirectTo: 'analytics',
                    pathMatch: 'full',
                },
                { path: 'analytics', component: AnalyticsComponent },

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
