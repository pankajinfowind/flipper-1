import { Invoice } from '../invoice';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

export class InvoiceDataSource implements DataSource<Invoice> {

  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
private length=0;
  public loading$ = this.loadingSubject.asObservable();

  invoicesCount$:Observable<Invoice[]>;

  constructor(private store:Store<fromStore.FlipperState>) {}

  connect(collectionViewer: CollectionViewer): Observable<Invoice[]> {
      return this.invoicesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.invoicesSubject.complete();
      this.loadingSubject.complete();
  }

  invoiceCount(){

  }
  set count(num){
    this.length=num;
  }
get count(){
  return this.length;
}
  loadInvoices(params={
    order_by:'created_at',order_dir:'desc',
    per_page:5,
    pageIndex:0,
    branch_id:parseInt(localStorage.getItem('active_branch')),
    query:null
  }) {
      this.store.dispatch(new fromStore.LoadInvoices(params));
      this.store.select(fromStore.getInvoicesLoading).subscribe(loading=> this.loadingSubject.next(loading));
      this.store.select(fromStore.getAllInvoices).pipe(
        catchError(() => of([])),
        finalize(() =>this.store.select(fromStore.getInvoicesLoading).subscribe(loading=> this.loadingSubject.next(loading)))
    ).subscribe(invoices=>{
       this.count=invoices.length;
       this.invoicesSubject.next(invoices)});

  }
}
