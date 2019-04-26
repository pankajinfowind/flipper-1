import { Invoice } from '../invoice';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CollectionViewer } from '@angular/cdk/collections';

export class InvoiceDataSource implements DataSource<Invoice> {

  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
private length=0;
  public loading$ = this.loadingSubject.asObservable();

  invoicesCount$:Observable<Invoice[]>;

  constructor() {}

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
}
