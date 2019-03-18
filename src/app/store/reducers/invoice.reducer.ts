import { Invoice } from '../../invoices/invoice';
import * as fromInvoice from '../actions/invoice.action';
export interface InvoiceState {
    data: Invoice[];
    loaded: boolean;
    loading: boolean;
    payload?:Invoice;
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
export const initialState: InvoiceState = {
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
  action: fromInvoice.InvoiceAction
): InvoiceState {

  switch (action.type) {
      case fromInvoice.ADD_INVOICE:{
        return {
          ...state,
          loading: true,
          payload: action.payload
        }
      }
      case fromInvoice.UPDATE_INVOICE_RECORD:{
        const data:Invoice[]=[...state.data,action.payload];
        return {
          ...state,
          loaded:true,
          loading: false,
          success:true,
          data

        }
      }

    case fromInvoice.LOAD_INVOICES:
      {
        return {
          ...state,
          loading: true

        }
      }

      case fromInvoice.LOAD_INVOICES_SUCCESSS:
      {
        const data:Invoice[]=action.payload.data;
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
      case fromInvoice.LOAD_INVOICES_FAIL:
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




export const getInvoicesLoading=(state:InvoiceState)=>state.loading;
export const getInvoicesLoaded=(state:InvoiceState)=>state.loaded;
export const getInvoices=(state:InvoiceState)=>state.data;
export const getInvoiceMeta=(state:InvoiceState)=>state.meta
export const addInvoice=(state:InvoiceState)=>state.payload;
export const getInvoiceRecord=(state:InvoiceState)=>state.data;
export const isSuccess=(state:InvoiceState)=>state.success;
