import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-validate-card',
  templateUrl: './validate-card.component.html',
  styleUrls: ['./validate-card.component.scss']
})
export class CardValidationComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  form: FormGroup;
  message = { message:null,momo: null, error: false };
  isFocused = '';
  constructor(
    private httpClient: HttpClient,
    public dialogRefs: MatDialogRef<CardValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }
    isSuccess=false;



  ngOnInit() {
    this.form = new FormGroup({
      opt: new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(15)
      ]),
       reference: new FormControl(this.data.flwRef)
    });
  }

  onNoClick(): void {this.dialogRefs.close();}

  get reference() {
    return this.form.get('reference');
  }
  get opt() {
    return this.form.get('opt');
  }

  focusing(value: any) {
    this.isFocused = value;
    this.form.controls.opt.setValue('');
  }
  focusingOut() {
    this.isFocused = '';
  }

  validateCard() {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': '*'});

    if (this.form.valid) {
      this.loading.next(true);
      this.isSuccess=false;
      this.message.error = false;
      const creds = 'reference=' + this.form.value.reference + '&opt=' + this.form.value.opt;
      return this.httpClient
         .post(environment.paymentUrl+'validate-transaction',creds,{headers}).
         pipe(finalize(() => this.loading.next(false)))
         .subscribe(res  => {
           this.loading.next(false);
           const response =res as any;

           if(response.message.status==='success' && response.message.data.data.responsemessage==='successful') {
            this.message.error = false;
            this.message.message = response.message.message as any;
            this.isSuccess=true;
            setTimeout(()=> {
              this.dialogRefs.close('success');
            },1000);
           } else {

            this.message.error = true;
            this.message.message = response.message.message as any;
           }

         }, error => {
           this.loading.next(false);
           this.message.error = true;
           const response =error as any;
           this.message.message = response.message.message as any;
         });
    }


  }
}
