import * as fromOrder from '../actions/order.action';
import { Orders } from '../../orders/orders';



export interface OrderState {
  ordered: Orders[];
  held:Orders[],
  complete:Orders[],
  pending:Orders[],
  failed:Orders[],
  loaded: boolean;
  loading: boolean;
  payload?:Orders;
  success?:boolean;
}
export const initialState: OrderState = {
  ordered:[],
  held:[],
  complete:[],
  pending:[],
  failed:[],
  loaded: false,
  loading: false,
  payload:null,
  success:false
}
export function reducer(
  state = initialState,
  action: fromOrder.OrderAction
): OrderState {

  switch (action.type) {
      case fromOrder.ADD_ORDER:{
        return {
          ...state,
          loading: true,
          payload: action.payload
        }
      }
      case fromOrder.UPDATE_ORDER_RECORD:{
        const ordered:Orders[]=[...state.ordered,action.payload];
        return {
          ...state,
          loaded:true,
          loading: false,
          success:true,
          ordered
        }
      }

    case fromOrder.LOAD_ORDERS:
      {
        return {
          ...state,
          loading: true

        }
      }

      case fromOrder.LOAD_ORDERS_SUCCESSS:
      {
        console.log('dddd',action.payload);
        const ordered:Orders[]=[...state.ordered,...action.payload.filter(order=>order.status==='ordered')];
        const held:Orders[]=[...state.held,...action.payload.filter(order=>order.status==='held')];
        const pending:Orders[]=[...state.pending,...action.payload.filter(order=>order.status==='pending')];
        const complete:Orders[]=[...state.complete,...action.payload.filter(order=>order.status==='complete')];
        const failed:Orders[]=[...state.failed,...action.payload.filter(order=>order.status==='failed')];
        return {
          ...state,
          loading: false,
          loaded:true,
          success:true,
          ordered,
          held,
          pending,
          complete,
          failed
        }
      }
      case fromOrder.LOAD_ORDERS_FAIL:
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

export const getOrdersLoading=(state:OrderState)=>state.loading;
export const getOrdersLoaded=(state:OrderState)=>state.loaded;

export const getOrdered=(state:OrderState)=>state.ordered;
export const getOrderHeld=(state:OrderState)=>state.held;
export const getOrderPending=(state:OrderState)=>state.pending;
export const getOrderComplete=(state:OrderState)=>state.complete;
export const getOrderFailed=(state:OrderState)=>state.failed;

export const addOrder=(state:OrderState)=>state.payload;
export const getOrderRecord=(state:OrderState)=>state.ordered;
export const isSuccess=(state:OrderState)=>state.success;
