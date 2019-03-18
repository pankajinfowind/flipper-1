import{Injectable} from'@angular/core';
import * as invoiceActions from'../actions/invoice.action';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import * as fromServices from '../../invoices/invoice.service';
import { of, Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
@Injectable()
export class InvoiceEffects{
constructor(private api:fromServices.InvoiceService,private action$:Actions){}

@Effect()
loadInvoices$: Observable<Action> = this.action$.pipe(
  ofType<invoiceActions.LoadInvoices>(
    invoiceActions.LOAD_INVOICES
  ),
  switchMap(action =>
    this.api.get(action.payload)
      .pipe(
        map(invoices=>new invoiceActions.LoadInvoicesSuccess(invoices),
        ),
        catchError(error=> of(new invoiceActions.LoadInvoicesFail(error)))
      )
  )
);
@Effect()
addInvoice$: Observable<Action> = this.action$.pipe(
  ofType<invoiceActions.AddInvoice>(
    invoiceActions.ADD_INVOICE
  ),
  switchMap(action =>
    this.api.create(action.payload)
      .pipe(
        map(invoice=>new invoiceActions.UpdateInvoiceRecord(invoice),
        ),
        catchError(error=> of(new invoiceActions.LoadInvoicesFail(error)))
      )
  )
);
@Effect({dispatch: false})
serverFailure$: Observable<Action> = this.action$.pipe(
  ofType<invoiceActions.LoadInvoicesFail>(
    invoiceActions.LOAD_INVOICES_FAIL
  ),
    map((action: invoiceActions.LoadInvoicesFail) => action.payload),
    exhaustMap(errors => {
        console.log('Server error happened:', errors);
        return of(null);
    }));

}




