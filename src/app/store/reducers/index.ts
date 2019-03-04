import {ActionReducerMap, createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromCustomers from './customer.reducer';
export interface CustomersState{
    customers:fromCustomers.CustomerState
}

export const reducers:ActionReducerMap<CustomersState> ={
customers:fromCustomers.reducer,
};
export const getCustomersState=createFeatureSelector<CustomersState>('customers');

export const getCustomerState=createSelector(
  getCustomersState,
  (state:CustomersState)=>state.customers);

  export const getAllCustomers=createSelector(
    getCustomerState,fromCustomers.getCustomers);

    export const getCustomersLoaded=createSelector(
      getCustomerState,fromCustomers.getCustomersLoaded);

      export const getCustomersLoading=createSelector(
        getCustomerState,fromCustomers.getCustomersLoading);

        export const isSuccess=createSelector(
          getCustomerState,fromCustomers.isSuccess);

        export const addCustomer=createSelector(
          getCustomerState,fromCustomers.addCustomer);
