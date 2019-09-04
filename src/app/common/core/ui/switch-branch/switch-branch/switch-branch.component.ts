import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Toast } from '../../toast.service';
import { Bootstrapper } from '../../../bootstrapper.service';
import { CurrentUser } from '../../../../auth/current-user';
import { ApiBranchService } from '../../../../../admin/master/branch/api/api.service';
import { Branch } from '../../../../../admin/master/branch/api/branch';
@Component({
  selector: 'switch-branch',
  templateUrl: './switch-branch.component.html',
  styleUrls: ['./switch-branch.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwitchBranchComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  constructor(private toast: Toast,private router: Router,private bootstrapper: Bootstrapper,public current: CurrentUser,private api:ApiBranchService) { }

  ngOnInit() {
  }
  maySwitchBranch(branch:Branch){
    if (!branch) return;
  const branchForm={
    old_switch_branch_id:this.current.getCurrentBranch('id')?this.current.getCurrentBranch('id'):branch.id,
    new_switch_branch_id:branch.id
  };
  
this.loading.next(true);
    this.api.switchBranch(branchForm).pipe(finalize(() => this.loading.next(false)))
        .subscribe(response => {
          this.bootstrapper.bootstrap(response.data);
          this.router.navigate([""]).then(navigated => {
            if (!navigated) {
              this.router.navigate([""]);
            }
          });
        }, error => {
            this.handleErrors(error);
        });
  }
  public handleErrors(response: {messages: object} = {messages: {}}) {
    console.log(response.messages || {});
}
isSwitchedMessage(){
  this.toast.open('The branch is already switched!');
}
}
