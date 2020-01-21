import { Component } from '@angular/core';
import { DashBoardEntries, fadeInAnimation } from '@enexus/flipper-components';
import { MockDashboard } from '../mock-data/dashboard';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('insertDashboard', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class DashboardComponent {
  dashboardEntries: DashBoardEntries = MockDashboard.data;

}
