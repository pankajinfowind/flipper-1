import {Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit} from '@angular/core';
import { Settings } from '../../config/settings.service';
import {CurrentUser} from '../../../auth/current-user';

@Component({
    selector: 'material-navbar',
    templateUrl: './material-navbar.component.html',
    styleUrls: ['./material-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MaterialNavbar implements OnInit {
    @Input() menuPosition: string;
    @Input() showToggleButton = false;
    @Input() container = false;
    @Input() showAuthButtons = false;

    @Output() toggleButtonClick = new EventEmitter();
    version:string;
    business:any;
    branch: any;
    constructor(
        public config: Settings,
        public currentUser: CurrentUser,
    ) {
      this.business=this.currentUser.get('business')[0];
      this.branch=this.currentUser.get('branches').find(b=>b.id==parseInt(localStorage.getItem('active_branch')));
      this.version=localStorage.getItem("version");
    }
    
  ngOnInit() {

    document.onreadystatechange =  () => {
        if (document.readyState == "complete") {
           // this.init();
        }
    };
}  

  

}
