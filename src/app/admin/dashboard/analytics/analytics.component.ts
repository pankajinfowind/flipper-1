import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../../common/auth/current-user';
import { Business } from '../../../business/api/business';
import { Branch } from '../../master/branch/api/branch';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  business:Business;
  branch: Branch;

  constructor(public currentUser: CurrentUser) { }

  ngOnInit() {
    this.business=this.currentUser.get('business')[0];
    this.branch=this.currentUser.get('branches').find(b=>b.id==parseInt(localStorage.getItem('active_branch')));
  }

}
