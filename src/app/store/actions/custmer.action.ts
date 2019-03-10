import{Action} from'@ngrx/store';
import { Customer } from '../../customers/customer';
import { PaginationResponse } from '../../common/core/types/pagination-response';

//load customers
export const LOAD_CUSTOMERS='[CUSTOMERS] Load Customers';
export const UPDATE_CUSTOMER_RECORD='[UPDATE_CUSTOMER_RECORD] Update Customer Record';
export const LOAD_CUSTOMERS_FAIL='[CUSTOMERS] Load Customers Fail';
export const LOAD_CUSTOMERS_SUCCESSS='[CUSTOMERS] Load Customers Success';
export const ADD_CUSTOMER='[CUSTOMERS] Add Customer';

export class LoadCustomers implements Action{

    readonly type = LOAD_CUSTOMERS;

}
export class AddCustomer implements Action{

  readonly type = ADD_CUSTOMER;
  constructor(public payload:Customer){}
}

export class LoadCustomersFail implements Action{

  readonly type = LOAD_CUSTOMERS_FAIL;
  constructor(public payload:any){}
}

export class LoadCustomersSuccess implements Action{

      readonly type = LOAD_CUSTOMERS_SUCCESSS;
      constructor(public payload:PaginationResponse<Customer>){
      }
}
export class UpdateCustomerRecord implements Action{

  readonly type = UPDATE_CUSTOMER_RECORD;
  constructor(public payload:Customer){
  }
}

// export action types

export type CustomerAction = LoadCustomers | LoadCustomersFail | LoadCustomersSuccess | AddCustomer | UpdateCustomerRecord;
