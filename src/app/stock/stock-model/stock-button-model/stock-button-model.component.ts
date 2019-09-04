import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Stock } from '../../api/stock';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { UpdateStockModelComponent } from '../update-stock-model/update-stock-model.component';

@Component({
  selector: 'app-stock-button-model',
  templateUrl: './stock-button-model.component.html',
  styleUrls: ['./stock-button-model.component.scss']
})
export class StockButtonModelComponent implements OnInit {

  constructor(private modal: Modal,public dialogRef: MatDialogRef<StockButtonModelComponent>,
    @Inject(MAT_DIALOG_DATA) public stock: Stock) {
   }
   close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  addStock(action){
    this.modal.open(
      UpdateStockModelComponent,
        {action:action,stock:this.stock?this.stock:null,
      },
        'select-reason-modal'
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.dialogRef.close(data);
    });
   }
}
