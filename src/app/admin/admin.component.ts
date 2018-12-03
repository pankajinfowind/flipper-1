import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrentUser } from '../common/auth/current-user';
import { Settings } from '../common/core/config/settings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
public appearance;
  /**
     * Controls left column visibility.
     */
    public leftColumnIsHidden = false;
  constructor(public setting:Settings) { }

  ngOnInit() {
    this.appearance=this.setting.getAll().appearance;
  }
  public toggleLeftSidebar() {
    this.leftColumnIsHidden = !this.leftColumnIsHidden;
}
}
