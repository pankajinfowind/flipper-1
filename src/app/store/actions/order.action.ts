import{Action} from'@ngrx/store';
import { Orders } from '../../orders/orders';

//load customers
export const LOAD_ORDERS='[ORDERS] Load Orders';
export const UPDATE_ORDER_RECORD='[UPDATE_ORDER_RECORD] Update Order Record';
export const LOAD_ORDERS_FAIL='[ORDERS] Load Orders Fail';
export const LOAD_ORDERS_SUCCESSS='[ORDERS] Load Orders Success';
export const ADD_ORDER='[ORDERS] Add Order';

export class LoadOrders implements Action{

    readonly type = LOAD_ORDERS;

}
export class AddOrder implements Action{

  readonly type = ADD_ORDER;
  constructor(public payload:Orders){}
}

export class LoadOrdersFail implements Action{

  readonly type = LOAD_ORDERS_FAIL;
  constructor(public payload:any){}
}

export class LoadOrdersSuccess implements Action{

      readonly type = LOAD_ORDERS_SUCCESSS;
      constructor(public payload:Orders[]){
      }
}
export class UpdateOrderRecord implements Action{

  readonly type = UPDATE_ORDER_RECORD;
  constructor(public payload:Orders){
  }
}

// export action types

export type OrderAction = LoadOrders | LoadOrdersFail | LoadOrdersSuccess | AddOrder | UpdateOrderRecord;
