import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Details } from '../../../details/details';
import { DetailsService } from '../../../details/details.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Stock } from '../../api/stock';
import { ApiStockService } from '../../api/api.service';
import { finalize } from 'rxjs/operators';
import { StockModelService } from '../../stock-model.service';
import { MasterModelService } from '../../../admin/master/master-model.service';
import { SetUp } from '../../../setup/setup';
import { SetUpModelService } from '../../../setup/setup-model.service';
import { Reason } from '../../../setup/reasons/api/reason';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-stock-model',
  templateUrl: './update-stock-model.component.html',
  styleUrls: ['./update-stock-model.component.scss']
})
export class UpdateStockModelComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;
  stockForm: FormGroup;
  stock:Stock;
  setup$: Observable<SetUp>;
  reasons: Reason[] = [];
  public loading = new BehaviorSubject(false);
  current_stock:number=0;
  found_stock:boolean=false;
  // action:any;
  constructor(private setupModelService: SetUpModelService,private msterModelService:MasterModelService,private modelStockService: StockModelService,private detailsService:DetailsService,private api:ApiStockService,public dialogRef: MatDialogRef<UpdateStockModelComponent>,
    @Inject(MAT_DIALOG_DATA) public action: any) {
   }
   close(): void {
    this.dialogRef.close({status:'none'});
  }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
      this.details$ = this.detailsService.details$;
      this.setup$ = this.setupModelService.setup$;
      this.details$.subscribe(res=>{
        if(res){
        const numberPatern = '^[0-9.,]+$';
        this.stock=res.sender_data;
        this.getReasons(this.action);
        this.stockForm = new FormGroup({
            qty:this.action && this.action==='add'?new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1)])):
            new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1)])),
            transction_date: new FormControl(new Date(), [Validators.required]),
            expired_date: new FormControl(),
            manufacture_date: new FormControl(),
            batch_no:new FormControl(this.stock.item.sku,[Validators.required]),
            comments:new FormControl('no comments'),
            action: new FormControl(this.action),
            in_stock_qty: new FormControl(0),
            total_qty: new FormControl(0),
            stock_id: new FormControl(res.sender_data && res.sender_data.stock_id),
            reason_id:new FormControl('', [Validators.required]),
          });
        }
       });
       this.checkEmpty(0);
    }
    getReasons(action) {
      this.setup$.subscribe(res => {
        if (res.reasons.length > 0) {
          this.reasons = res.reasons.filter(res=>res.reason_type=='stock_movements' && res.stock_movements_status==action);
        }
      });

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
        if(this.action=='add'){
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

  updateStock(){

    if (this.stockForm.valid) {
      this.loading.next(true);
      this.stockForm.value.in_stock_qty=this.stockForm.value.action=='add'?this.stock.in_stock_qty+parseInt(this.stockForm.value.qty):this.stock.in_stock_qty-parseInt(this.stockForm.value.qty);
      this.stockForm.value.available_stock_qty=this.calculateTQty(this.stockForm.value.action);
      this.api.addOrRemoveExistingItem(this.stockForm.value).pipe(finalize(() =>this.loading.next(false)))
      .subscribe(
            res => {
            if(res.status=='success'){
                if(res["stocks"]['data'].length > 0){
                this. updateItemModelService(res["stocks"]['data'],this.stockForm.value.stock_id)
                }
                  this.close();
              }
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
  updateItemModelService(data:Stock[]=[],stock_id){
    let available=[];
    let lowerstock=[];
    let stockout=[];

    const item =data.find(item=>item.stock_id==stock_id);
    available=data.filter(stock=>stock.status==='available');
    lowerstock=data.filter(stock=>stock.status==='lowerstock');
    stockout =data.filter(stock=>stock.status==='stockout');
    this.modelStockService.update({ loading: false, available: available,lowerstock:lowerstock,stockout:stockout });
    this.detailsService.update({title:'Stock Details',sender_data:item,module:'app-stock',component:'app-info-stock-model',action:'info',detailsVisible:true});
  }

}

