import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiPricingService } from '../../pricing/api/api.service';
import { ApiItemService } from '../../items/api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Details } from '../../../../details/details';
import { MasterModelService } from '../../master-model.service';
import { Pricing } from '../../pricing/api/pricing';

@Component({
  selector: 'app-pricing-model',
  templateUrl: './pricing-model.component.html',
  styleUrls: ['./pricing-model.component.scss']
})
export class PricingModelComponent implements OnInit {

  pricing: Pricing[] = [];
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new:boolean=true;
  pricing_id:number=0;
  pricingForm: FormGroup;

//
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api:ApiPricingService,private apiItem:ApiItemService,private detailsService:DetailsService) { }

  ngOnInit() {

    this.details$ = this.detailsService.details$;
    this.details$.subscribe(res=>{
        if(res.action=='new'){
          this.need_to_add_new=true;
        }else{
          this.need_to_add_new=false;
        }

        this.pricing_id=res.sender_data?res.sender_data.pricing_id:0;

        this.pricingForm = new FormGroup({
          name: new FormControl(res.sender_data?res.sender_data.name:"", [Validators.required])
        });
  });
  }




  ///////////////////////////// Pricing
  get name() {
    return this.pricingForm.get("name");
  }
  savePricing(){
    if (this.pricingForm.valid) {
      this.loading.next(true)
      const data = { name: this.pricingForm.value.name,color:this.pricingForm.value.color };
      return  this.need_to_add_new?this.create(data):this.update(data,this.pricing_id);
    }
  }

  create(data){
    this.api.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Pricing added Successfully!');
            this.pricingForm.reset();
            this.msterModelService.update({loading:false, pricing:res["pricing"]["data"]?res["pricing"]["data"]:[]});

          }
      },
      _error => {
      console.error(_error);
      }
    );
  }
  update(data,id){
    this.api.update(data,id).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Pricing updated Successfully!');
            this.msterModelService.update({loading:false, pricing:res["pricing"]["data"]?res["pricing"]["data"]:[]});
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
