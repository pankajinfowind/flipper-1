import {Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit} from '@angular/core';
import { Settings } from '../../config/settings.service';
import {CurrentUser} from '../../../auth/current-user';
import { Router } from '@angular/router';

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
    @Input() position :string='sidebar';
    @Output() toggleButtonClick = new EventEmitter();
    version:string;
    constructor(
        public config: Settings,
        public current: CurrentUser,
        private router: Router,
    ) {
   
    }
    
  ngOnInit() {
    if(this.current.isAdmin() || this.current.isManager()){
      this.showToggleButton=true;
    }
 
}  

gotoDashBoard(){
  return this.router.navigate(["/admin/analytics"]);
}

}
