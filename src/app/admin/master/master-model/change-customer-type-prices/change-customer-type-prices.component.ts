import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Master } from '../../master';
import { SetUp } from '../../../../setup/setup';
import { MatTableDataSource } from '@angular/material';
import { SetUpModelService } from '../../../../setup/setup-model.service';
import { MasterModelService } from '../../master-model.service';
import { FormArray, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CustomerType } from '../../../../setup/customerType/api/CustomerType';
import { CustomerTypePrices } from '../../../../setup/customerType/api/CustomerTypePrices';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CurrentUser } from '../../../../common/auth/current-user';
import { ApiCustomerTypeService } from '../../../../setup/customerType/api/api.service';
import { finalize } from 'rxjs/operators';
import { Toast } from '../../../../common/core/ui/toast.service';
import { Details } from '../../../../details/details';
import { DetailsService } from '../../../../details/details.service';
import { Item } from '../../../../pos/api/item';
import { Settings } from '../../../../common/core/config/settings.service';

@Component({
  selector: 'app-change-customer-type-prices',
  templateUrl: './change-customer-type-prices.component.html',
  styleUrls: ['./change-customer-type-prices.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ChangeCustomerTypePricesComponent implements OnInit,OnChanges {
  step = 0;
  master$: Observable < Master > ;
  setup$: Observable<SetUp>;
  dataSource = new MatTableDataSource < any > ([]);
  public loading = new BehaviorSubject(false);
  customertypeFormGroup: FormGroup;
  selected_row_id: number = 0;
  expandedElement: CustomerTypePrices | null;
  dataSource_new_customer_type= new MatTableDataSource < any > ([]);
  subscription: Observable<Details>;
  details$: Observable<Details>;
  item:Item=null;
  newCustomerTypeForm: FormGroup;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  displayedColumns: string[] = [
    "name",
    "price",
    'action'
  ];
  displayedColumnsNewCustomerType: string[] =
   [
  'name',
  'price',
   'action'
  ];
  currency_code:string='';
  @Output() valueChange = new EventEmitter<boolean>();
  constructor(protected settings: Settings,private detailsService: DetailsService,private toast: Toast,private capi:ApiCustomerTypeService,public currentUser: CurrentUser,private _fb: FormBuilder,private setupModelService: SetUpModelService,private msterModelService: MasterModelService) { }
  rows: FormArray = this._fb.array([]);
  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
    this.loadItemModelDetails();
    this.loadingFormGroup(null);

    this.currency_code=this.currentUser.get('business')[0].currency_code;
  }
  loadingFormGroup(d: CustomerTypePrices = null) {
    const numberPatern = '^[0-9.,]+$';
    this.customertypeFormGroup = new FormGroup({
      customer_type_id: new FormControl(d && d.customer_type_id ? d.customer_type_id : null, [Validators.required]),
      name: new FormControl(d && d.customer_type.name?d.customer_type.name:null, [Validators.required]),
      sale_price_including_tax: new FormControl(d && d.sale_price_including_tax?d.sale_price_including_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_excluding_tax: new FormControl(d && d.sale_price_excluding_tax?d.sale_price_excluding_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
    });
  }
  loadNewCustomerTypeFormGroup() {
    this.newCustomerTypeForm = new FormGroup({
      newCustomerType: this.rows
    });
  }
  loadItemModelDetails(){
    this.details$.subscribe(res => {
      if(res.sender_data){
        this.item=res.sender_data;
        this.dataSource.data = res.sender_data.customer_type_items.filter(c=>c.customer_type.active==1);
        this.findUnattachedCustomerTypePrices(res.sender_data.customer_type_items.filter(c=>c.customer_type.active==1));
        this.loadNewCustomerTypeFormGroup();

      }
    });
  }

  addRow(d ? : CustomerType, noUpdate ? : boolean) {
    const numberPatern = '^[0-9.,]+$';
    let row=null;
     row = new FormGroup({
      item_id:new FormControl(this.item.id && this.item.id ? this.item.id : 0),
      customer_type_id: new FormControl(d && d.customer_type_id ? d.customer_type_id : null, [Validators.required]),
      sale_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
    });
    this.rows.push(row);
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.entry = changes.entry.currentValue.filter(c=>c.customer_type.active==1);
    // this.dataSource.data = this.entry;

  }
  edit(element) {
    this.loadingFormGroup(element);
  }

  findUnattachedCustomerTypePrices(data){
    const arr:CustomerType[]=[];

    if(data.length == 0){

          this.capi.get().subscribe(res => {
            if (res.data.length > 0) {
                  res.data.filter(c=>c.is_active==1).forEach(ctype => {
                    if(!this.dataSource.data.find(c=>c.customer_type_id==ctype.id)){
                      if(!arr.find(c=>c.id==ctype.id)){
                        this.addRow(ctype, false);
                        arr.push(ctype);
                      }
                    }


                  });
            }
          });


    }else{
      for (var i = 0; i <  data.length; i++) {
        this.capi.get().subscribe(res => {
          if (res.data.length > 0) {
            res.data.filter(c=>c.is_active==1).forEach(ctype => {
                if(!this.dataSource.data.find(c=>c.customer_type_id==ctype.id)){
                  if(!arr.find(c=>c.id==ctype.id)){
                    this.addRow(ctype, false);
                    arr.push(ctype);
                  }

                }

            });

          }
        })

      }
    }

      this.dataSource_new_customer_type = new MatTableDataSource < CustomerType > (arr);


  }


  uniqueObjectInArray(arr){
    let obj = {};
    arr = Object.keys(arr.reduce((prev, next) => {
      if (!obj[next.customer_type_id]) obj[next.customer_type_id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return arr;
  }
  delete(element) {
    var r = confirm("Are you sure, you want to delete permantly this price.");
    if (r == true) {

      this.loading.next(true);
      this.capi.detachItemCustomerTypePrice(element.id).pipe(finalize(() => this.loading.next(false))).subscribe(
        res => {
          this.detailsService.receiverData(res,true);
          this.valueChange.next(true);
        },
        _error => {
          console.error(_error);
        }
      );
    }
  }
  updateItemModelService(data){
    const item =data.find(item=>item.id==this.item.id);
    this.msterModelService.update({ loading: false, items: data ? data : [] });

    this.detailsService.update({title:'Edit a Product',sender_data:item,module:'app-master',component:'app-items',action:'edit',detailsVisible:true});
  }
  saveCustometTypeUpdate(element){
        if(!this.customertypeFormGroup.valid) return alert('Invalid input');
        const data:CustomerTypePrices={
          sale_price_excluding_tax:this.customertypeFormGroup.value.sale_price_excluding_tax,
          sale_price_including_tax:this.customertypeFormGroup.value.sale_price_including_tax,
        }
        this.loading.next(true);
        this.capi.updateItemPricesByCustomerType(data,element.id).pipe(finalize(() => this.loading.next(false))).subscribe(
            res => {
                  this.toast.open('Customer Specific Prices updated Successfully!');
                  this.detailsService.receiverData(res,true);
                  this.valueChange.next(true);
            },
            _error => {
              console.error(_error);
            }
        );
  }

  saveNewCustomerType(element,save_as_all=false){

if (this.newCustomerTypeForm.valid) {
  this.loading.next(true);
    const form_data:CustomerTypePrices[]=[];
      this.newCustomerTypeForm.value.newCustomerType.forEach(form_item=>{
          if(!save_as_all){
            if(form_item.customer_type_id===element.customer_type_id){
              form_data['_token']=this.settings.csrfToken;
              form_data.push(form_item);
            }
          }else{
            form_data['_token']=this.settings.csrfToken;
            form_data.push(form_item);
          }
      });

      const data= this.uniqueObjectInArray(form_data);
      this.capi.createItemPricesByCustomerType({data:data}).pipe(finalize(() => this.loading.next(false))).subscribe(
          res => {

                this.toast.open('Customer Specific Prices created Successfully!');
                this.detailsService.receiverData(res,true);
                this.valueChange.next(true);
          },
          _error => {
            console.error(_error);
          }
      );
  }else{
    alert('Invalid Input');
  }
}
}
