import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, switchMap, filter} from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { PosStockStates } from '../../store/states/PosStockStates';
import { Stock } from '../../stock/api/stock';
import { LoadSearchableStockEntries } from '../../store/actions/pos-Stock.action';
import { PosSearchStockStates } from '../../store/states/PosSearchStockStates';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'pos-search-bar',
  templateUrl: './pos-search-bar.component.html',
  styleUrls: ['./pos-search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosSearchBarComponent implements OnInit 
{
  @ViewChild('trigger', {read: ElementRef}) trigger: ElementRef;
  formControl = new FormControl();
  //public results: BehaviorSubject<State[]> = new BehaviorSubject([]);
  public results: Observable<Stock[]>;
  private lastQuery: string;
  public dispaly_autocomplete:boolean=false;
  states: Stock[] = [
];
states2: Stock[] = [
];
  @Select(PosSearchStockStates.entries) entries$: Observable<Stock[]>;
  @Select(PosSearchStockStates.loading) loading$: Observable<boolean>;
  @Select(PosStockStates.entries) items_entries$: Observable<Stock[]>;
  business: Business;
  constructor(private store:Store,public currentUser: CurrentUser) {
    
   }

   
  ngOnInit() {
    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
    }
    
    this.searchableResults();
    this.allItems();
    this.results = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state): this.states.slice())
      );
  }
  percentage(num,num1) {
    let sum=Math.round(parseInt(num) *100)/parseInt(num1);
  return isNaN(sum)?0:sum.toFixed(1);
}
  private searchableResults(){
    this.store.dispatch(new LoadSearchableStockEntries());
    this.entries$.subscribe(res=>this.states.push(...res));
  }
  private allItems(){
    this.items_entries$.subscribe(res=>this.states2.push(...res));
  }
  private _filterStates(value: string): Stock[] {
    const filterValue = value.toLowerCase();
    if(this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0).length > 0){
      return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
    }else if (this.states2.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0).length > 0){
      return this.states2.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0); 
    }else{
      this.store.dispatch(new LoadSearchableStockEntries({query:filterValue}));
      this.searchableResults();
      if(this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0).length > 0){
        return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
      }
    }
  
  }
  
  removeDups(data: Array<any>) {
    let obj = {};
    if(data.length==0) return [];
    data = Object.keys(data.reduce((prev, next) => {
      if (!obj[next.id]) obj[next.id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return data.reverse();
  };
 
  public resetForm() {
    this.formControl.reset();
    this.searchableResults();
}


}
