import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../../auth/auth.service';
import { CurrentUser } from '../../../../auth/current-user';

@Component({
  selector: 'app-switch-branch-model',
  templateUrl: './switch-branch-model.component.html',
  styleUrls: ['./switch-branch-model.component.scss']
})
export class SwitchBranchModelComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  constructor(
    private router: Router,
    public auth: AuthService,
    public current: CurrentUser) { }

  ngOnInit() {
  }
  close(){
   // return this.dialogRef.close('closed'); 
  }
  logOut(){
    this.loading.next(true);
    this.auth.logOut().pipe(finalize(() => this.loading.next(false)))
            .subscribe(() => {
             // this.dialogRef.close('closed');
              this.current.clear();
       this.router.navigate(["/login"]);
      // this.dialogRef.close('closed'); 
            }, error => {
              console.log(error);
            });
  }
}
