import * as fromCustomer from '../actions/custmer.action';
import { Customer } from '../../customers/customer';


export interface CustomerState {
  data: Customer[];
  loaded: boolean;
  loading: boolean;
  payload?:Customer
}
export const initialState: CustomerState = {
  data: [],
  loaded: false,
  loading: false,
  payload:null
}
export function reducer(
  state = initialState,
  action: fromCustomer.CustomerAction
): CustomerState {

  switch (action.type) {
      case fromCustomer.ADD_CUSTOMER:{
        return {
          ...state,
          loaded:true,
          loading: true,
          payload: action.payload
        }
      }
      case fromCustomer.LOAD_CUSTOMER:{
        const data:Customer[]=state.data;
        data.unshift(action.payload);
        return {
          ...state,
          loaded:true,
          loading: true,
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
          data
        }
      }
      case fromCustomer.LOAD_CUSTOMERS_FAIL:
      {
        return {
          ...state,
          loading: false,
          loaded:false

        }
      }
  }
  return state;
};

export const getCustomersLoading=(state:CustomerState)=>state.loading;
export const getCustomersLoaded=(state:CustomerState)=>state.loaded;
export const getCustomers=(state:CustomerState)=>state.data;
export const addCustomer=(state:CustomerState)=>state.payload;
export const getCustomer=(state:CustomerState)=>state.data;
