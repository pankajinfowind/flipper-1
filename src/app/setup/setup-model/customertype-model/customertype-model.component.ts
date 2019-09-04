import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerType } from '../../customerType/api/CustomerType';
import { Details } from '../../../details/details';
import { SetUpModelService } from '../../setup-model.service';
import { Toast } from '../../../common/core/ui/toast.service';
import { ApiCustomerTypeService } from '../../customerType/api/api.service';
import { DetailsService } from '../../../details/details.service';

@Component({
  selector: 'app-customertype-model',
  templateUrl: './customertype-model.component.html',
  styleUrls: ['./customertype-model.component.scss']
})
export class CustomerTypeModelComponent implements OnInit {

  pricing: CustomerType[] = [];
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new:boolean=true;
  customer_type_id:number=0;
  customerTypeForm: FormGroup;

//
  constructor(private setupModelService:SetUpModelService,private toast: Toast,private api:ApiCustomerTypeService,private detailsService:DetailsService) { }

  ngOnInit() {

    this.details$ = this.detailsService.details$;
    this.details$.subscribe(res=>{
        if(res.action=='new'){
          this.need_to_add_new=true;
        }else{
          this.need_to_add_new=false;
        }

        this.customer_type_id=res.sender_data?res.sender_data.customer_type_id:0;
        const numberPatern = '^[0-9.,]+$';
        this.customerTypeForm = new FormGroup({
          name: new FormControl(res.sender_data?res.sender_data.name:"", [Validators.required]),
          discount_value: new FormControl(res.sender_data?res.sender_data.discount_value:0.0, [Validators.required,Validators.pattern(numberPatern)]),
          description: new FormControl(res.sender_data?res.sender_data.description:"")
        });
  });
  }




  ///////////////////////////// Pricing
  get name() {
    return this.customerTypeForm.get("name");
  }

  get discount_value() {
    return this.customerTypeForm.get("discount_value");
  }

  get description() {
    return this.customerTypeForm.get("description");
  }
  saveCustomerType(){
    if (this.customerTypeForm.valid) {
      this.loading.next(true)
      const data = { name: this.customerTypeForm.value.name,
               discount_value:this.customerTypeForm.value.discount_value,
               description:this.customerTypeForm.value.description };
      return  this.need_to_add_new?this.create(data):this.update(data,this.customer_type_id);
    }
  }

  create(data){
    this.api.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {

            this.toast.open('Customer Type added Successfully!');
            this.customerTypeForm.reset();
            this.setupModelService.update({loading:false, customertypes:res["customertypes"]["data"]?res["customertypes"]["data"]:[]});


      },
      _error => {
      console.error(_error);
      }
    );
  }
  update(data,id){
    this.api.update(data,id).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {

            this.toast.open('Customer Type updated Successfully!');
            this.setupModelService.update({loading:false, customertypes:res["customertypes"]["data"]?res["customertypes"]["data"]:[]});
            this.close();

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
