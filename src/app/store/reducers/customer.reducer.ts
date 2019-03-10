import * as fromCustomer from '../actions/custmer.action';
import { Customer } from '../../customers/customer';


export interface CustomerState {
    data: Customer[];
    loaded: boolean;
    loading: boolean;
    payload?:Customer;
    success?:boolean;
    meta:{
    from: number;
    to: number;
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    path: string;
    next_page_url: string|null;
    prev_page_url: string|null;
    }
}
export const initialState: CustomerState = {
  data: [],
  loaded: false,
  loading: false,
  payload:null,
  success:false,
 meta:{
  from: 0,
  to: 0,
  total: 0,
  per_page: 0,
  current_page: 0,
  last_page: 0,
  path: null,
  next_page_url: null,
  prev_page_url:null,
 }
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
        const data:Customer[]=action.payload.data;
        const meta:any=action.payload.from?{
          from:action.payload.from,
          to:action.payload.to,
          total: action.payload.total,
          per_page: action.payload.per_page,
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          path: action.payload.path,
          next_page_url: action.payload.next_page_url,
          prev_page_url:action.payload.prev_page_url}:state.meta;
        return {
          ...state,
          loading: false,
          loaded:true,
          success:true,
          data,
          meta

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
export const getCustomerMeta=(state:CustomerState)=>state.meta
export const addCustomer=(state:CustomerState)=>state.payload;
export const getCustomerRecord=(state:CustomerState)=>state.data;
export const isSuccess=(state:CustomerState)=>state.success;
