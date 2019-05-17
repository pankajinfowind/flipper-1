import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SetUp } from '../../setup/setup';
import { SetUpModelService } from '../../setup/setup-model.service';
import { ExpirationSetting } from '../../setup/expiration_setting/api/expiration_setting';
import { ApiExpiredItemService } from './api/api.service';
import { Select, Store } from '@ngxs/store';
import { PosStockExpiredStates } from '../../store/states/PosStockExpiredStates';
import { StockExpired } from './api/expired-stock';
import { LocalStorage } from '../../common/core/services/local-storage.service';
import { LoadStockExpiredEntries } from '../../store/actions/pos-Stock-Expired.action';
import { GlobalVariables } from '../../common/core/global-variables';

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
  expandedId=null;
@Select(PosStockExpiredStates.entries) entries$: Observable<StockExpired>;
  all_url='';
  branch_id=0;

  constructor(public v: GlobalVariables,private localStorage: LocalStorage,private store:Store,private api:ApiExpiredItemService) {
    this.branch_id=parseInt(this.localStorage.get('active_branch'));
    this.all_url="expired_item/all/"+parseInt(this.localStorage.get('active_branch'));
   }

  ngOnInit() {
    this.v.webTitle('Stock Expired');
    this.viewExpiredByPeriod();
  }

  viewExpiredByPeriod(){
    this.loading.next(true);
        this.api.getExpPeriod().subscribe(res=>{
          if(res.data){
            this.loading.next(false);
            this.expirationSetting=res.data;
          }else{
            this.expirationSetting=[];
          }
      });
  }

  expandingOpened(element){
    const url="expired_item/period/"+this.branch_id+"/"+element.period_value+"/"+element.period;
    this.localStorage.set('stockExpiredUrl',url);
    //if(url!=this.localStorage.get('stockExpiredUrl')){
        this.expandedId=element.id;
        this.store.dispatch(new LoadStockExpiredEntries());
   // }

  }
  expandingClosed(){
  //  alert('closed');
  }
}
