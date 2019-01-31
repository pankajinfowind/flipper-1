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
            new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1),Validators.max(res.sender_data.available_stock_qty)])),
            transction_date: new FormControl(new Date(), [Validators.required]),
            expired_date: new FormControl(),
            manufacture_date: new FormControl(),
            batch_no:new FormControl('',[Validators.required]),
            comments:new FormControl('no comments'),
            action: new FormControl(this.action),
            in_stock_qty: new FormControl(0),
            total_qty: new FormControl(0),
            stock_id: new FormControl(res.sender_data && res.sender_data.stock_id),
            reason_id:new FormControl('', [Validators.required]),
          });
        }
       });
    }
    getReasons(action) {
      this.setup$.subscribe(res => {
        if (res.reasons.length > 0) {
          this.reasons = res.reasons.filter(res=>res.reason_type=='stock_movements' && res.stock_movements_status==action);
        }
      });

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
              let available=[];
              let lowerstock=[];
              let stockout=[];
                if(res["stocks"]['data'].length > 0){
                  available=res["stocks"]['data'].filter(stock=>stock.status==='available');
                  lowerstock=res["stocks"]['data'].filter(stock=>stock.status==='lowerstock');
                  stockout =res["stocks"]['data'].filter(stock=>stock.status==='stockout');
                }
                this.modelStockService.update({ loading: false, available: available,lowerstock:lowerstock,stockout:stockout });

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
  // close(){
  //   this.detailsService.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  // }

}

