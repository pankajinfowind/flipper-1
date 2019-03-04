import * as fromCustomer from '../actions/custmer.action';
import { Customer } from '../../customers/customer';


export interface CustomerState {
  data: Customer[];
  loaded: boolean;
  loading: boolean;
  payload?:Customer;
  success?:boolean;
}
export const initialState: CustomerState = {
  data: [],
  loaded: false,
  loading: false,
  payload:null,
  success:false
}
export function reducer(
  state = initialState,
  action: fromCustomer.CustomerAction
): CustomerState {

  switch (action.type) {
      case fromCustomer.ADD_CUSTOMER:{
        return {
          ...state,
          loading: true,
          payload: action.payload
        }
      }
      case fromCustomer.UPDATE_CUSTOMER_RECORD:{
        const data:Customer[]=[...state.data,action.payload];
        return {
          ...state,
          loaded:true,
          loading: false,
          success:true,
          data
        }
      }

    case fromCustomer.LOAD_CUSTOMERS:
      {
        return {
          ...state,
          loading: true

        }
      }

      case fromCustomer.LOAD_CUSTOMERS_SUCCESSS:
      {

        const data= action.payload;
        return {
          ...state,
          loading: false,
          loaded:true,
          success:true,
          data
        }
      }
      case fromCustomer.LOAD_CUSTOMERS_FAIL:
      {
        return {
          ...state,
          loading: false,
          loaded:false,
          success:false,

        }
      }
  }
  return state;
};

export const getCustomersLoading=(state:CustomerState)=>state.loading;
export const getCustomersLoaded=(state:CustomerState)=>state.loaded;
export const getCustomers=(state:CustomerState)=>state.data;
export const addCustomer=(state:CustomerState)=>state.payload;
export const getCustomerRecord=(state:CustomerState)=>state.data;
export const isSuccess=(state:CustomerState)=>state.success;
