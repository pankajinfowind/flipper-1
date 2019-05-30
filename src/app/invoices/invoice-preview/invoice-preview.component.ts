import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Invoice } from '../invoice';
import { Store } from '@ngxs/store';
import { InvoiceDetails } from '../../store/actions/pos-Order.action';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  constructor(private store:Store,public dialogRef: MatDialogRef<InvoicePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data){
      this.store.dispatch(new InvoiceDetails(this.data));
    }
      
  }
  public close() {
    this.dialogRef.close();
}
}
