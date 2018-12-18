import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../categories/api/category';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiCategoryService } from '../../categories/api/api.service';
import { ApiItemService } from '../../items/api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Details } from '../../../../details/details';
import { MasterModelService } from '../../master-model.service';
import { Master } from '../../master';
import { CurrentUser } from '../../../../common/auth/current-user';
import { Business } from '../../../../business/api/business';

@Component({
  selector: 'app-item-model',
  templateUrl: './item-model.component.html',
  styleUrls: ['./item-model.component.scss']
})
export class ItemModelComponent implements OnInit {
  master$: Observable<Master>;
  itemForm: FormGroup;
  categories: Category[] = [];
  numberPatern = '^[0-9.]+$';
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  currencies: string[];
  need_to_add_new:boolean=true;
  category_placeholder='Choose Item Category';
  item_id:number=0;
  business:Business;
  upc_tool_tips="The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol on retail packaging in the United States.";
  sku_tool_tips="The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC. Leave blank to auto generate SKU.";
  constructor(public currentUser:CurrentUser,private msterModelService:MasterModelService,private toast: Toast,private apiItem:ApiItemService,private detailsService:DetailsService) { }

  ngOnInit() {
    this.business=this.currentUser.get('business')[0];
    this.currencies= [this.business.currency_code];
    this.master$ = this.msterModelService.master$;
    this. getActiveCategories();
    this.details$ = this.detailsService.details$;
    this.loadingFormGroup();
  }

  loadingFormGroup(){
    this.details$.subscribe(res=>{
      if(res.action=='new'){
        this.need_to_add_new=true;
      }else{
        this.need_to_add_new=false;
      }
      this.category_placeholder=res.sender_data?res.sender_data.category.name:'Choose Item Category';
      this.item_id=res.sender_data?res.sender_data.id:0;
      this.itemForm = new FormGroup({
        item: new FormControl(res.sender_data?res.sender_data.item:"", [Validators.required]),
        sku: new FormControl(res.sender_data?res.sender_data.sku:0, [Validators.required]),
        upc:new FormControl(res.sender_data?res.sender_data.upc:0, [Validators.required]),
        summary:new FormControl(res.sender_data?res.sender_data.summary:'null'),
        manufacturer:new FormControl(res.sender_data?res.sender_data.manufacturer:'null'),
        currency: new FormControl(res.sender_data?res.sender_data.currency:"Rwf", [Validators.required]),
        unit_cost: new FormControl(res.sender_data?res.sender_data.unit_cost:0.00, [Validators.required, Validators.pattern(this.numberPatern)]),
        unit_sale: new FormControl(res.sender_data?res.sender_data.unit_sale:0.00, [Validators.required, Validators.pattern(this.numberPatern)]),
        category_id: new FormControl(res.sender_data?res.sender_data.category.category_id:0, [Validators.required]),
        barcode: new FormControl(res.sender_data?res.sender_data.barcode:"barcode")
      });
});
  }


  getActiveCategories(){
    this.master$.subscribe(res=>{
      if(res.categories.length  > 0){
        this.categories=res.categories;
      }
  });

  }


  ///////////////////////////// Item
  get item() {
    return this.itemForm.get("item");
  }

  get sku() {
    return this.itemForm.get("sku");
  }

  get unit_sale() {
    return this.itemForm.get("unit_sale");
  }
  get category_id() {
    return this.itemForm.get("category_id");
  }
  get barcode() {
    return this.itemForm.get("barcode");
  }
  get unit_cost() {
    return this.itemForm.get("unit_cost");
  }
  get upc() {
    return this.itemForm.get("upc");
  }
  get summary() {
    return this.itemForm.get("summary");
  }
  get currency() {
    return this.itemForm.get("currency");
  }
  get manufacturer() {
    return this.itemForm.get("manufacturer");
  }
  saveItem(){
    if (this.itemForm.valid) {
      this.loading.next(true)
      const data = {
                  item: this.itemForm.value.item,
                  sku:this.itemForm.value.sku,
                  upc:this.itemForm.value.upc,
                  summary:this.itemForm.value.summary,
                  manufacturer:this.itemForm.value.manufacturer==''?'null':this.itemForm.value.manufacturer,
                  currency:this.itemForm.value.currency,
                  unit_cost:this.itemForm.value.unit_cost,
                  unit_sale:this.itemForm.value.unit_sale,
                  category_id:this.itemForm.value.category_id,
                  barcode:this.itemForm.value.barcode
             };
           return  this.need_to_add_new?this.create(data):this.update(data,this.item_id);
    }
  }

  create(data){
    this.apiItem.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {

          if(res.status=='success'){
            this.toast.open('Item added Successfully!');
            this.loadingFormGroup();

            this.msterModelService.update({loading:false, items:res["items"]["data"]?res["items"]["data"]:[]});
          }
      },
      _error => {
      console.error(_error);
      }
    );
  }
  update(data,id){
    this.apiItem.update(data,id).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Item updated Successfully!');
            this.loadingFormGroup();
            this.msterModelService.update({loading:false, items:res["items"]["data"]?res["items"]["data"]:[]});
            this.close();
          }
      },
      _error => {
      console.error(_error);
      }
    );
  }


  close(){
    this.detailsService.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  }

}
