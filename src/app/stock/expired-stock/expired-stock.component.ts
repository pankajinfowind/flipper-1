import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SetUp } from '../../setup/setup';
import { SetUpModelService } from '../../setup/setup-model.service';
import { ExpirationSetting } from '../../setup/expiration_setting/api/expiration_setting';
import { ApiExpiredItemService } from './api/api.service';
import { finalize } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-expired-stock',
  templateUrl: './expired-stock.component.html',
  styleUrls: ['./expired-stock.component.scss']
})

export class ExpiredStockComponent implements OnInit {
  panelOpenState = false;
triggerState=false;
  setup$: Observable<SetUp>;
  expirationSetting:ExpirationSetting[];
  entries:any[]=[];
  public loading = new BehaviorSubject(false);
  searchForm: FormGroup;

  constructor(private api:ApiExpiredItemService,private setupModelService:SetUpModelService) { }

  ngOnInit() {
    this.setup$ = this.setupModelService.setup$;
    this.viewExpiredByPeriod();
    this.loadingSearchForm();
   // this. viewAllExpired();
  }
  loadingSearchForm(){
    this.searchForm = new FormGroup({
      from: new FormControl(new Date(), [Validators.required]),
      to:new FormControl(new Date(), [Validators.required])
    });
  }
  get from() {
    return this.searchForm.get("from");
  }
  get to() {
    return this.searchForm.get("to");
  }

  viewExpiredByperiodical(element:ExpirationSetting){

// TODO: when close expanded list do not request again from api.

    if(element){
    this.loading.next(true);
      this.api.getByPeriodExpiredItems(parseInt(localStorage.getItem('active_branch')),element.period_value,element.period).pipe(finalize(() =>this.loading.next(false))).subscribe(
        res => {
            //this.modelStockService.update({ loading: false, expiredStock:res["expired_items"]['data'].length > 0?res["expired_items"]['data']:[]});
        },
        _error => {
        console.error(_error);
        }
      );
    }
  }

  viewAllExpired(){
    this.loading.next(true);

      this.api.getAllExpiredItems(parseInt(localStorage.getItem('active_branch'))).pipe(finalize(() =>this.loading.next(false))).subscribe(
        res => {
            //this.modelStockService.update({ loading: false, expiredStock:res["expired_items"]['data'].length > 0?res["expired_items"]['data']:[]});
        },
        _error => {
        console.error(_error);
        }
      );

  }

  viewExpiredBySearch(){
    this.loading.next(true);
    if (this.searchForm.valid) {
    this.api.getBySearchExpiredItems(parseInt(localStorage.getItem('active_branch')),this.searchForm.value.from,this.searchForm.value.to).pipe(finalize(() =>this.loading.next(false))).subscribe(
      res => {
         // this.modelStockService.update({ loading: false, expiredStock:res["expired_items"]['data'].length > 0?res["expired_items"]['data']:[]});
      },
      _error => {
      console.error(_error);
      }
    );
    }else{
      this.loading.next(false);
    }
  }

  viewExpiredByPeriod(){
    this.entries=[];
    this.loading.next(true);
        this.setup$.subscribe(res=>{
          if(res.expirationSetting.length  > 0){
            this.loading.next(false);
            this.expirationSetting=res.expirationSetting;
          }else{
            //this.canUserAddExpirationSettings();
          }
      });
  }
}
