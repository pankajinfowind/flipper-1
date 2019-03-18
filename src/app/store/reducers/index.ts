import {ActionReducerMap, createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromCustomers from './customer.reducer';
import * as fromOrders from './order.reducer';
import * as fromInvoices from './invoice.reducer';
export interface FlipperState{
    customers:fromCustomers.CustomerState,
    orders:fromOrders.OrderState,
    invoices:fromInvoices.InvoiceState
}


export const reducers:ActionReducerMap<FlipperState> ={
customers:fromCustomers.reducer,
orders:fromOrders.reducer,
invoices:fromInvoices.reducer
};

export const getAllState=createFeatureSelector<FlipperState>('flipperModel');

////////////////////////////////////////////// CustomerSelesctor

export const getCustomersState=createSelector(
  getAllState,
  (state:FlipperState)=>state.customers);

  export const getAllCustomers=createSelector(
    getCustomersState,fromCustomers.getCustomers);

    export const getCustomerMeta=createSelector(
      getCustomersState,fromCustomers.getCustomerMeta);


    export const getCustomersLoaded=createSelector(
      getCustomersState,fromCustomers.getCustomersLoaded);

      export const getCustomersLoading=createSelector(
        getCustomersState,fromCustomers.getCustomersLoading);

        export const isCustomerSuccess=createSelector(
          getCustomersState,fromCustomers.isSuccess);

        export const addCustomer=createSelector(
          getCustomersState,fromCustomers.addCustomer);



          ////////////////////////////////////////////// OrderState


          export const getOrdersState=createSelector(
            getAllState,
            (state:FlipperState)=>state.orders);

            export const getAllOrdered=createSelector(
              getOrdersState,fromOrders.getOrdered);

              export const getAllOrderHeld=createSelector(
                getOrdersState,fromOrders.getOrderHeld);

                export const getAllOrderComplete=createSelector(
                  getOrdersState,fromOrders.getOrderComplete);

                  export const getAllOrderPending=createSelector(
                    getOrdersState,fromOrders.getOrderPending);

                    export const getAllOrderFailed=createSelector(
                      getOrdersState,fromOrders.getOrderFailed);

                      export const getOrdersLoaded=createSelector(
                        getOrdersState,fromOrders.getOrdersLoaded);

                        export const getOrdersLoading=createSelector(
                          getOrdersState,fromOrders.getOrdersLoading);

                          export const isOrderSuccess=createSelector(
                            getOrdersState,fromOrders.isSuccess);

                          export const addOrder=createSelector(
                            getOrdersState,fromOrders.addOrder);



                            ////////////////////////////////////////////// InvoicesSelesctor

                      export const getInvoicesState=createSelector(
                        getAllState,
                        (state:FlipperState)=>state.invoices);

                        export const getAllInvoices=createSelector(
                          getInvoicesState,fromInvoices.getInvoices);

                          export const getInvoiceMeta=createSelector(
                            getInvoicesState,fromInvoices.getInvoiceMeta);


                          export const getInvoicesLoaded=createSelector(
                            getInvoicesState,fromInvoices.getInvoicesLoaded);

                            export const getInvoicesLoading=createSelector(
                              getInvoicesState,fromInvoices.getInvoicesLoading);

                              export const isInvoiceSuccess=createSelector(
                                getInvoicesState,fromInvoices.isSuccess);

                              export const addInvoice=createSelector(
                                getInvoicesState,fromInvoices.addInvoice);


