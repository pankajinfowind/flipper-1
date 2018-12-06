import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Details } from '../../../details/details';
import { DetailsService } from '../../../details/details.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Stock } from '../../api/stock';
import { ApiStockService } from '../../api/api.service';
import { finalize } from 'rxjs/operators';
import { StockModelService } from '../../stock-model.service';
import { MasterModelService } from '../../../admin/master/master-model.service';

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

  add_options:any[]=[{
            value:'Stock-new',
            valueView:'New Stock',
            checked:true
          },{
          value:'Usable-Return',
          valueView:'Usable Return',
          checked:false
        },
        {
          value:'Unusable-Return',
          valueView:'Unusable Return',
          checked:false
        }];

        remove_options:any[]=[{
          value:'Customer-Sale',
          valueView:'Customer Sale',
          checked:true
        },{
          value:'Stock-Damaged',
          valueView:'Stock Damaged',
          checked:false
        }];
  public loading = new BehaviorSubject(false);
  action:any;
  constructor(private msterModelService:MasterModelService,private modelStockService: StockModelService,private detailsService:DetailsService,private api:ApiStockService) {
   }


    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
      this.details$ = this.detailsService.details$;
      this.details$.subscribe(res=>{
        if(res){
        const numberPatern = '^[0-9.,]+$';
        this.stock=res.sender_data;
        this.stockForm = new FormGroup({
            qty:res.sender_data && res.action==='add'?new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1)])):
            new FormControl(1, Validators.compose([Validators.required, Validators.pattern(numberPatern), Validators.min(1),Validators.max(res.sender_data.available_stock_qty)])),
            unit_cost: new FormControl(res.sender_data.item ?res.sender_data.item.unit_cost:1, Validators.compose([Validators.required, Validators.pattern(numberPatern)])),
            transction_date: new FormControl(new Date(), [Validators.required]),
            comments:new FormControl('no comments'),
            transction:res.sender_data && res.action==='add'?new FormControl('Stock-new'):new FormControl('Customer-Sale'),
            currency: new FormControl(res.sender_data.item ?res.sender_data.item.currency:'Rwf'),
            action: new FormControl(res.sender_data && res.action),
            in_stock_qty: new FormControl(0),
            total_qty: new FormControl(0),
            stock_id: new FormControl(res.sender_data && res.sender_data.stock_id),
          });
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
  get unit_cost() {
    return this.stockForm.get("unit_cost");
  }
  get comments() {
    return this.stockForm.get("comments");
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
             this.modelStockService.update({loading:false, available:res["available"]["data"]?res["available"]["data"]:[],stockout:res["stockout"]["data"]?res["stockout"]["data"]:[]});
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
  close(){
    this.detailsService.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  }
}
