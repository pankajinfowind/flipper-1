import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiItemService } from '../../items/api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Details } from '../../../../details/details';
import { MasterModelService } from '../../master-model.service';
import { Brand } from '../../brands/api/brand';
import { ApiBrandService } from '../../brands/api/api.service';

@Component({
  selector: 'app-brand-model',
  templateUrl: './brand-model.component.html',
  styleUrls: ['./brand-model.component.scss']
})
export class BrandModelComponent implements OnInit {

  Brand: Brand[] = [];
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new:boolean=true;
  brand_id:number=0;
  brandForm: FormGroup;

//
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api:ApiBrandService,private apiItem:ApiItemService,private detailsService:DetailsService) { }

  ngOnInit() {

    this.details$ = this.detailsService.details$;
    this.details$.subscribe(res=>{
        if(res.action=='new'){
          this.need_to_add_new=true;
        }else{
          this.need_to_add_new=false;
        }

        this.brand_id=res.sender_data?res.sender_data.brand_id:0;

        this.brandForm = new FormGroup({
          name: new FormControl(res.sender_data?res.sender_data.name:"", [Validators.required]),
          description:new FormControl('---'),
        });
  });
  }




  ///////////////////////////// Brand
  get name() {
    return this.brandForm.get("name");
  }
  get description() {
    return this.brandForm.get("description");
  }
  saveBrand(){
    if (this.brandForm.valid) {
      this.loading.next(true)
      const data = { name: this.brandForm.value.name,description:this.brandForm.value.description};
      return  this.need_to_add_new?this.create(data):this.update(data,this.brand_id);
    }
  }

  create(data){
    this.api.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Brand added Successfully!');
            this.brandForm.reset();
            this.msterModelService.update({loading:false, brands:res["brands"]["data"]?res["brands"]["data"]:[]});

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
            this.toast.open('Brand updated Successfully!');
            this.msterModelService.update({loading:false, brands:res["brands"]["data"]?res["brands"]["data"]:[]});
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
