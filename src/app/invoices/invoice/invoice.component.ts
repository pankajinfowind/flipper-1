import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Observable, merge, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Invoice } from '../invoice';
import { MatPaginator, MatSort } from '@angular/material';
import { InvoiceDataSource } from './load-invoice-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CurrentUser } from '../../common/auth/current-user';
import { SetUp } from '../../setup/setup';
import { CustomerType } from '../../setup/customerType/api/CustomerType';
import { SetUpModelService } from '../../setup/setup-model.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements AfterViewInit, OnInit {
  setup$: Observable<SetUp>;
  customertypes: CustomerType[] = [];
  dataSource: InvoiceDataSource;
  displayedColumns= ["invoice_no",'customer','customer_type','total_items','total_amount','total_discounts','amount_given','amount_return', "payment_method",'status',"invoice_date",'invoice_time','created_at'];
  currency_code:string=null;
  selected_customer_type = null;
  searchForm: FormGroup;
  constructor(private setupModelService: SetUpModelService, public currentUser: CurrentUser,private store:Store<fromStore.FlipperState>) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @ViewChild('findCustomerType') findCustomerType: ElementRef;
  // @ViewChild('searchInvoiceByDate') searchInvoiceByDate: ElementRef;



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

  ngOnInit() {
     this.dataSource = new InvoiceDataSource(this.store);
     this.dataSource.loadInvoices();
     if (this.currentUser.user) {
      this.currency_code = this.currentUser.get('business')[0].currency_code;
    }
    this.setup$ = this.setupModelService.setup$;
    this.loadingSearchForm();
  }

  ngAfterViewInit() {
  this.onSearch();
  this.onFindCustomerType();
  //this.onSearchInvoiceByDate();
 this.onMerge();// on sort or paginate events, load a new page
}
onSearch(){
  fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadInvoicePage('invoice_no='+this.input.nativeElement.value);
                })
            )
            .subscribe();
}
// onSearchInvoiceByDate(){
//   fromEvent(this.searchInvoiceByDate.nativeElement,'submit')
//             .pipe(
//                 debounceTime(150),
//                 distinctUntilChanged(),
//                 tap(() => {
//                     this.paginator.pageIndex = 0;
//                     this.loadInvoicePage('invoice_no='+this.input.nativeElement.value);
//                 })
//             )
//             .subscribe();
// }

changeCustomerType(event){
console.log(event);
}
onFindCustomerType(){
  fromEvent(this.findCustomerType.nativeElement,'change')
  .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
          this.paginator.pageIndex = 0;
          this.loadInvoicePage('customer_type_id='+this.findCustomerType.nativeElement.value);
      })
  )
  .subscribe();
}

onSort(){
  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
}
onMerge(){
  merge(this.sort.sortChange, this.paginator.page)
  .pipe(
      tap(() => this.loadInvoicePage())
  )
  .subscribe();
}
clear(){
  this.input.nativeElement.value=null;
  this.paginator.pageIndex = 0;
  return this.loadInvoicePage();
}

loadInvoicePage(query=null) {
  
  const params={
    order_by:this.sort.active,
    order_dir:this.sort.direction,
    per_page:this.paginator.pageSize,
    pageIndex:this.paginator.pageIndex,
    branch_id:parseInt(localStorage.getItem('active_branch')),
    query:query
  }
  console.log(params);
    this.dataSource.loadInvoices(params);
}
  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' currently.';
  }

}
