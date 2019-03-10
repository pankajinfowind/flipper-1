import{Injectable} from'@angular/core';
import * as orderActions from'../actions/order.action';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import * as fromServices from '../../pos/api/api.service';
import { of, Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
@Injectable()
export class OrderEffects{
constructor(private api:fromServices.ApiPosService,private action$:Actions){}


@Effect()
loadOrders$: Observable<Action> = this.action$.pipe(
  ofType<orderActions.LoadOrders>(
    orderActions.LOAD_ORDERS
  ),
  switchMap(action =>
    this.api.get()
      .pipe(
        map(orders=>new orderActions.LoadOrdersSuccess(orders.data),
        ),
        catchError(error=> of(new orderActions.LoadOrdersFail(error)))
      )
  )
);

@Effect()
addOrder$: Observable<Action> = this.action$.pipe(
  ofType<orderActions.AddOrder>(
    orderActions.ADD_ORDER
  ),
  switchMap(action =>
    this.api.createOrder(action.payload)
      .pipe(
        map(order=>new orderActions.LoadOrdersSuccess([order.data]),
        ),
        catchError(error=> of(new orderActions.LoadOrdersFail(error)))
      )
  )
);
@Effect({dispatch: false})
serverFailure$: Observable<Action> = this.action$.pipe(
  ofType<orderActions.LoadOrdersFail>(
    orderActions.LOAD_ORDERS_FAIL
  ),
    map((action: orderActions.LoadOrdersFail) => action.payload),
    exhaustMap(errors => {
        console.log('Server error happened:', errors);
        return of(null);
    }));

}
