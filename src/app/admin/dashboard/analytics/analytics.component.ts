import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../../common/auth/current-user';
import { Business } from '../../../business/api/business';
import { Branch } from '../../master/branch/api/branch';
import { GlobalVariables } from '../../../common/core/global-variables';
import { LocalStorage } from '../../../common/core/services/local-storage.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  business:Business;
  branch: Branch;

  constructor(private localStorage: LocalStorage,public v: GlobalVariables,public currentUser: CurrentUser) { }

  ngOnInit() {
    this.localStorage.set('active_menu', 'dashboard');
    this.v.webTitle("Analytics DashBoard - Flipper");
    this.business=this.currentUser.get('business')[0];
    this.branch=this.currentUser.get('branches').find(b=>b.id==parseInt(localStorage.getItem('active_branch')));
  }

}
