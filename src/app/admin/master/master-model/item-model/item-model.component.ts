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

@Component({
  selector: 'app-item-model',
  templateUrl: './item-model.component.html',
  styleUrls: ['./item-model.component.scss']
})
export class ItemModelComponent implements OnInit {
  itemForm: FormGroup;
  categories: Category[] = [];
  numberPatern = '^[0-9.]+$';
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  currencies: string[] = ['Rwf'];
  need_to_add_new:boolean=true;
  category_placeholder='Choose Item Category';
  item_id:number=0;
  constructor(private toast: Toast,private apiCat:ApiCategoryService,private apiItem:ApiItemService,private detailsService:DetailsService) { }

  ngOnInit() {

    this. getActiveCategories();
    this.details$ = this.detailsService.details$;
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
          sku: new FormControl(res.sender_data?res.sender_data.sku:"", [Validators.required]),
          currency: new FormControl(res.sender_data?res.sender_data.currency:"", [Validators.required]),
          price: new FormControl(res.sender_data?res.sender_data.price:"", [Validators.required, Validators.pattern(this.numberPatern)]),
          sale_price: new FormControl(res.sender_data?res.sender_data.sale_price:"", [Validators.required, Validators.pattern(this.numberPatern)]),
          category_id: new FormControl(res.sender_data?res.sender_data.category.category_id:"", [Validators.required]),
          barcode: new FormControl(res.sender_data?res.sender_data.barcode:"barcode")
        });
  });
  }


  getActiveCategories(){
    this.loading.next(true);
    this.apiCat.get().pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
        this.categories=res['categories']['data'].filter(res=>res.is_active==1);
      },
      _error => {
      console.error(_error);
      }
    );
  }


  ///////////////////////////// Item
  get item() {
    return this.itemForm.get("item");
  }

  get sku() {
    return this.itemForm.get("sku");
  }

  get price() {
    return this.itemForm.get("price");
  }
  get category_id() {
    return this.itemForm.get("category_id");
  }
  get barcode() {
    return this.itemForm.get("barcode");
  }
  get sale_price() {
    return this.itemForm.get("sale_price");
  }
  get currency() {
    return this.itemForm.get("currency");
  }
  saveItem(){
    if (this.itemForm.valid) {
      this.loading.next(true)
      const data = {
                  item: this.itemForm.value.item,
                  sku:this.itemForm.value.sku,
                  price:this.itemForm.value.price,
                  category_id:this.itemForm.value.category_id,
                  barcode:this.itemForm.value.barcode,
                  currency:this.itemForm.value.currency,
                  sale_price:this.itemForm.value.sale_price
             };
           return  this.need_to_add_new?this.create(data):this.update(data,this.item_id);
    }
  }

  create(data){
    this.apiItem.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Item added Successfully!');
            this.itemForm.reset();
            this.detailsService.update({receriver_data:res.data});
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
            this.itemForm.reset();
            this.detailsService.update({receriver_data:res.data});
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
