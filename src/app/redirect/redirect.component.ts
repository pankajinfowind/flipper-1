import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../common/auth/current-user';
import { Router } from '@angular/router';
import { GlobalVariables } from '../common/core/global-variables';
import { Modal } from '../common/core/ui/dialogs/modal.service';
import { SwitchBranchModelComponent } from '../common/core/ui/switch-branch/switch-branch-model/switch-branch-model.component';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private modal: Modal,public auth:CurrentUser, private router: Router, public v: GlobalVariables) {

     this.goTo();
  }

  ngOnInit() {
    this.goTo();
  }

  goTo(){
    console.log(this.auth.hasBusiness);
    if (this.auth.hasBusiness) {
        if(this.auth.isAdmin()){
          this.v.webTitle('Admin');
          localStorage.setItem('active_menu','dashboard');
          return this.router.navigate(["/admin/analytics"]);
           }else if(this.auth.isCashier()){
          this.v.webTitle('Cashier');
          if(this.auth.hasCurrentBranch()){
            return this.router.navigate(["/cashier/pos"]);
          }else{
            this.branchesModel();
          }
          
        }else if(this.auth.isManager()){
         this.v.webTitle('Branch Manager');
          if(this.auth.hasCurrentBranch()){
            return this.router.navigate(["/admin/analytics"]);
          }else{
            this.branchesModel();
          }
          
        }

    }else{
      this.v.webTitle('Create Business/Company');
      console.log(this.auth.hasBusiness);
      return this.router.navigate(["/customer"]);
    }

  }

  branchesModel() {
    return this.router.navigate(["/switch-branch"]);
    }
}
