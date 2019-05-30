import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvoiceDetails } from '../../../store/actions/pos-Order.action';

@Component({
  selector: 'app-preview-order-invoice',
  templateUrl: './preview-order-invoice.component.html',
  styleUrls: ['./preview-order-invoice.component.scss']
})
export class PreviewOrderInvoiceComponent implements OnInit {

  constructor(private store:Store,public dialogRef: MatDialogRef<PreviewOrderInvoiceComponent>,
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
