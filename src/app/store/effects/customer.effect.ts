import{Injectable} from'@angular/core';
import * as customerActions from'../actions/custmer.action';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import * as fromServices from '../../customers/customer.service';
import { of, Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
@Injectable()
export class CustomerEffects{
constructor(private api:fromServices.CustomerService,private action$:Actions){}

@Effect()
loadCustomers$: Observable<Action> = this.action$.pipe(
  ofType<customerActions.LoadCustomers>(
    customerActions.LOAD_CUSTOMERS
  ),
  switchMap(action =>
    this.api.getAllCustomers()
      .pipe(
        map(customers=>new customerActions.LoadCustomersSuccess(customers),
        ),
        catchError(error=> of(new customerActions.LoadCustomersFail(error)))
      )
  )
);
@Effect()
addCustomer$: Observable<Action> = this.action$.pipe(
  ofType<customerActions.AddCustomer>(
    customerActions.ADD_CUSTOMER
  ),
  switchMap(action =>
    this.api.create(action.payload)
      .pipe(
        map(customer=>new customerActions.UpdateCustomerRecord(customer),
        ),
        catchError(error=> of(new customerActions.LoadCustomersFail(error)))
      )
  )
);
@Effect({dispatch: false})
serverFailure$: Observable<Action> = this.action$.pipe(
  ofType<customerActions.LoadCustomersFail>(
    customerActions.LOAD_CUSTOMERS_FAIL
  ),
    map((action: customerActions.LoadCustomersFail) => action.payload),
    exhaustMap(errors => {
        console.log('Server error happened:', errors);
        return of(null);
    }));

}




