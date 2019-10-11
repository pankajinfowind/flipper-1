import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CurrentUser } from '../../../common/auth/current-user';
import { Toast } from '../../../common/core/ui/toast.service';
import { ApiItemService } from '../items/api/api.service';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../../../common/core/config/settings.service';

@Component({
  selector: 'import-items-modal',
  templateUrl: './import-items.component.html',
  styleUrls: ['./import-items.component.scss']
})
export class ImportItemsComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  error='';
  @ViewChild('fileInput',{static:true}) fileInput;  
  constructor(private dialogRef: MatDialogRef<ImportItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,protected settings: Settings,public currentUser: CurrentUser,  private toast: Toast, private api: ApiItemService) {
   }


  ngOnInit() {
  }
  public close(data?: any) {
    this.dialogRef.close(data);
}

  uploadExcel() { 
    this.error=''; 
    let formData = new FormData();  
    //this.settings.csrfToken
    formData.append('_token', this.settings.csrfToken);
    formData.append('excel_file', this.fileInput.nativeElement.files[0]); 
    this.loading.next(true);
    return this.api.importItems(formData).pipe(finalize(() => this.loading.next(false)))
    .subscribe(response => {
     // console.log(response);
        if(response){
            this.toast.open('Product imported successfully!');
            this.close(response);
            this.fileInput.nativeElement.value=null;
            this.fileInput.nativeElement.addEventListener( 'focus', ()=>{ this.fileInput.nativeElement.classList.add( 'has-focus' ); });
            this.fileInput.nativeElement.addEventListener( 'blur', ()=>{ this.fileInput.nativeElement.classList.remove( 'has-focus' ); }); 
        }
    }, error => {
      console.log(error);
      if(error['error']){
        if(error['error'] && error['error']['excel_file']){
          this.error=error['error']['excel_file'];
      }else  if(error['error'] && error['error']['invalid_format']){
        //invalid_format
        this.error=error['error']['invalid_format'];
      }
      }
     
      console.log(error['error']);
      this.fileInput.nativeElement.value=null;
      this.fileInput.nativeElement.addEventListener( 'focus', ()=>{ this.fileInput.nativeElement.classList.add( 'has-focus' ); });
      this.fileInput.nativeElement.addEventListener( 'blur', ()=>{ this.fileInput.nativeElement.classList.remove( 'has-focus' ); }); 
    });  
   
  } 
 

}
