import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Insurance } from '../../insurance/api/insurance';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../../../common/core/ui/toast.service';
import {  ApiInsuranceService } from '../../insurance/api/ap.service';
import { ApiItemService } from '../../items/api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Details } from '../../../../details/details';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MasterModelService } from '../../master-model.service';

@Component({
  selector: 'app-insurance-model',
  templateUrl: './insurance-model.component.html',
  styleUrls: ['./insurance-model.component.scss']
})
export class InsuranceModelComponent implements OnInit {

  insurance: Insurance[] = [];
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new:boolean=true;
  insurance_id:number=0;
  insuranceForm: FormGroup;

  constructor(private msterModelService:MasterModelService,private toast: Toast,private api:ApiInsuranceService,private apiItem:ApiItemService,private detailsService:DetailsService) { }

   ngOnInit() {



    this.details$ = this.detailsService.details$;
     this.details$.subscribe(res=>{
        if(res.action=='new'){
          this.need_to_add_new=true;
        }else{
          this.need_to_add_new=false;
        }
        this.insurance_id=res.sender_data?res.sender_data.insurance_id:0;
         this.insurances(res.sender_data);

  });
  }




  ///////////////////////////// Insurance
  get name() {
    return this.insuranceForm.get("name");
  }


  saveInsurance(){
    if (this.insuranceForm.valid) {
      this.loading.next(true)
      const data = { name: this.insuranceForm.value.name };
      return  this.need_to_add_new?this.create(data):this.update(data,this.insurance_id);
    }
  }

  create(data){
    this.api.create(data).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
          if(res.status=='success'){
            this.toast.open('Insurance added Successfully!');
            console.log(res);
            this.insuranceForm.reset();
            this.detailsService.update({receriver_data:res.data});
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
            this.toast.open('Insurance updated Successfully!');
            this.insuranceForm.reset();
            this.detailsService.update({receriver_data:res.data});
            this.close();
          }
      },
      _error => {
      console.error(_error);
      }
    );
  }


  selection = new SelectionModel<Insurance>(true, []);
  insurance_data: Insurance[] = [];
  displayedColumns: string[] = ['select','logo_url','name', 'discount','country','address'];
  dataSource = new MatTableDataSource<Insurance>([]);


  insurances(data){
    this.loading.next(true);
    this.api.get().pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
        this.insurance_data = res['insurances']['data'];
        if(data && data.length  > 0){
          const array_of_all_insurances=this.insurance_data;

          let filtered_insurancees=[];

          array_of_all_insurances.forEach(each_insurance=>{
            data.forEach(element=> {
              if(each_insurance.insurance_id !== element.insurance_id ){
                filtered_insurancees.push(each_insurance);
              }else{
                filtered_insurancees=[];
              }
            });
          });

          this.dataSource.data = filtered_insurancees;
        }else{
          this.dataSource.data =  this.insurance_data;
        }
      },
      _error => {
      //console.error(_error);
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
      this.api.attachInsurance({data:this.selection.selected}).pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
            if(res.status=='success'){
              this.toast.open('Insurance(s) attached to business!');
              this.msterModelService.update({loading: false, insurances:  res['business_insurance']?res['business_insurance']:[]});
              this.close();
            }
        },
        _error => {
       // console.error(_error);
        }
      );
    }
  }

  close(){
    this.detailsService.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  }
  message(t="New Insurance"){
    return ''+t.trim().toLowerCase()+'';
  }
  subMessage(t="insurance"){
    return 'There are no new '+t.trim().toLowerCase()+'  currently, all added.';
  }
}
