import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiCategoryService } from '../categories/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiItemService } from '../items/api/api.service';
import { Category } from '../categories/api/category';
import { Toast } from '../../../common/core/ui/toast.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() link = "";
  @Input() action = "";
  @Output()
  valueChange = new EventEmitter<any>();
  cateogryForm: FormGroup;
  itemForm: FormGroup;
  public loading = new BehaviorSubject(false);
  currencies: string[] = ['Rwf'];
  categories: Category[] = [
    {category_id:  1, name: 'Amata'}
  ];
  constructor(private toast: Toast,private apiCat:ApiCategoryService,private apiItem:ApiItemService) { }


  ngOnInit() {
    this.cateogryForm = new FormGroup({
      name: new FormControl("", [Validators.required])
    });

    this.itemForm = new FormGroup({
      item: new FormControl("", [Validators.required]),
      sku: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      sale_price: new FormControl("", [Validators.required]),
      category_id: new FormControl("", [Validators.required]),
      barcode: new FormControl("barcode")
    });
  }
  get name() {
    return this.cateogryForm.get("name");
  }

  close(){
    this.valueChange.emit({close_modal:true});
  }

  saveCategory(){
    if (this.cateogryForm.valid) {
      this.loading.next(true)
      const data = { name: this.cateogryForm.value.name };
      this.apiCat.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          if(res.status=='status'){
            this.toast.open('Category recorded successfull!');
            //this.valueChange.emit(res);
          }
        },
        _error => {
        console.error(_error);
        }
      );
    }
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
      this.apiItem.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {

            if(res.status=='status'){
              this.toast.open('Item recorded successfull!');
              this.valueChange.emit(res);
            }
        },
        _error => {
        console.error(_error);
        }
      );
    }
  }

}
