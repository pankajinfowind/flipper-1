import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Details } from '../../../details/details';
import { DetailsService } from '../../../details/details.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Stock } from '../../api/stock';
import { ApiStockService } from '../../api/api.service';
import { finalize } from 'rxjs/operators';
import { MasterModelService } from '../../../admin/master/master-model.service';
import { SetUp } from '../../../setup/setup';
import { SetUpModelService } from '../../../setup/setup-model.service';
import { Reason } from '../../../setup/reasons/api/reason';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Toast } from '../../../common/core/ui/toast.service';
import { SharedModelService } from '../../../shared-model/shared-model-service';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { SelectReasonModelComponent } from './select-reason-model/select-reason-model.component';
export interface ModalData {
  stock:Stock;
  action:string;
}
@Component({
  selector: 'app-update-stock-model',
  templateUrl: './update-stock-model.component.html',
  styleUrls: ['./update-stock-model.component.scss']
})

export class UpdateStockModelComponent implements OnInit {

  stockForm: FormGroup;
  stock:Stock;
  reasons: Reason[] = [];
  public loading = new BehaviorSubject(false);
  current_stock:number=0;
  found_stock:boolean=false;
  // action:any;
  constructor(private toast: Toast,private modal: Modal,private api:ApiStockService,public dialogRef: MatDialogRef<UpdateStockModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) {
      this.stock=this.data.stock['stock'];
   }
   close(data?): void {
    this.dialogRef.close(data);
  }

    ngOnInit() {
      const numberPatern = '^[0-9.,]+$';
       this.stockForm = new FormGroup({
        qty:this.data && this.data.action==='add'?new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1)])):
        new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1)])),
        transction_date: new FormControl(new Date(), [Validators.required]),
        expired_date: new FormControl(),
        manufacture_date: new FormControl(),
        batch_no:new FormControl(this.stock? this.stock.item.sku:'',[Validators.required]),
        comments:new FormControl('no comments'),
        action: new FormControl(this.data.action),
        in_stock_qty: new FormControl(0),
        total_qty: new FormControl(0),
        stock_id: new FormControl(this.stock?this.stock.stock_id:0),
        reason_id:new FormControl(null),
        reason:new FormControl('', [Validators.required]),
      });
       this.checkEmpty(0);
    }

    empty(){
      this.stockForm.get('batch_no').setValue('');
    }
    checkEmpty(event){
      const input=event==0?this.stock.item.sku:event.target.value;

      if(input =='' || null){
        this.stockForm.get('batch_no').setValue(this.stock.item.sku);
      }else{
        const arrays=this.stock.stock_transctions.filter(sk=>sk.batch_no==input);
        if(arrays.length > 0){
            this.current_stock=this.arrayAdd(this.arrayGetColumn(arrays,'in_qty'))-this.arrayAdd(this.arrayGetColumn(arrays,'out_qty'));
        }
        if(this.data.action=='add'){
          this.found_stock=true;
        }else{
          this.found_stock=arrays.length > 0?true:false;
        }

      }

    }
arrayAdd(arrays){
    return arrays.reduce((total, amount) => total + amount);
}
arrayRemove(arrays){
  return arrays.reduce((total, amount) => total - amount);
}
arrayGetColumn(array,column){
  const result = [];
  array.forEach(e => {
    result.push(e[column]);
  });
  return result;
}

  ///////////////////////////// Item
  get qty() {
    return this.stockForm.get("qty");
  }
  get transction_date() {
    return this.stockForm.get("transction_date");
  }
  get expired_date() {
    return this.stockForm.get("expired_date");
  }
  get manufacture_date() {
    return this.stockForm.get("manufacture_date");
  }
  get batch_no() {
    return this.stockForm.get("batch_no");
  }
  get comments() {
    return this.stockForm.get("comments");
  }
  get reason_id() {
    return this.stockForm.get("reason_id");
  }
  get reason() {
    return this.stockForm.get("reason");
  }

  updateStock(){

    if (this.stockForm.valid) {
      this.loading.next(true);
      this.stockForm.value.in_stock_qty=this.stockForm.value.action=='add'?this.stock.in_stock_qty+parseInt(this.stockForm.value.qty):this.stock.in_stock_qty-parseInt(this.stockForm.value.qty);
      this.stockForm.value.available_stock_qty=this.calculateTQty(this.stockForm.value.action);
      this.api.addOrRemoveExistingItem(this.stockForm.value).pipe(finalize(() =>this.loading.next(false)))
      .subscribe(
            res => {
                  this.toast.open('Stock updated Successfully!');
              this.close(res);
            },
        _error => {
        console.error(_error);
        }
     );
    }
  }
  calculateTQty(action){
    return action=='add'?this.stock.available_stock_qty+parseInt(this.qty.value):this.stock.available_stock_qty-parseInt(this.qty.value);
  }
  showChooseReasonModal() {
    this.modal.open(
      SelectReasonModelComponent,
        {enabled:true,
          reason_id:this.stockForm.value.reason_id?this.stockForm.value.reason_id:null,
          reason_type:'stock_movements',
          url:'reasons/stock_movements',
         reason_name:'Stock Movements Reason'
      },
        'select-reason-modal'
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.stockForm.get('reason_id').setValue(data.id);
        this.stockForm.get('reason').setValue(data.name);
    });
  }
}

