import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiCategoryService } from '../categories/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiItemService } from '../items/api/api.service';
import { Category } from '../categories/api/category';
import { Toast } from '../../../common/core/ui/toast.service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Insurance } from '../insurance/api/insurance';
import { ApiInsuranceService } from '../insurance/api/ap.service';

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
  categories: Category[] = [];
  numberPatern = '^[0-9.]+$';
  constructor(private apiIns:ApiInsuranceService,private toast: Toast,private apiCat:ApiCategoryService,private apiItem:ApiItemService) { }


  ngOnInit() {
    if(this.link=='Items'){
    this.getActiveCategories();
    }
    if(this.link=='Insurances'){
      this.insurances();
    }
    this.cateogryForm = new FormGroup({
      name: new FormControl("", [Validators.required])
    });

    this.itemForm = new FormGroup({
      item: new FormControl("", [Validators.required]),
      sku: new FormControl("", [Validators.required]),
      currency: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(this.numberPatern)]),
      sale_price: new FormControl("", [Validators.required, Validators.pattern(this.numberPatern)]),
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

  saveCategory(){
    if (this.cateogryForm.valid) {
      this.loading.next(true)
      const data = { name: this.cateogryForm.value.name };
      this.apiCat.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
        if(res.status=='success'){
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
            if(res.status=='success'){
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


  selection = new SelectionModel<Insurance>(true, []);
  insurance_data: Insurance[] = [];
  displayedColumns: string[] = ['select','logo_url','name', 'discount','country','address'];
  dataSource = new MatTableDataSource<Insurance>([]);


  insurances(){
    this.loading.next(true);
    this.apiIns.get().pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
        this.insurance_data = res['insurances']['data'];
        this.dataSource = new MatTableDataSource<Insurance>(this.insurance_data);
      },
      _error => {
      console.error(_error);
      }
    );
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  attachInsuranceToBusiness(){
    if (this.selection.selected.length > 0) {
      this.loading.next(true);
      const data = {insurance:this.selection.selected};
      this.apiIns.attachInsurance(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
            if(res.status=='success'){
              this.toast.open('Insurance attached to business!');
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
