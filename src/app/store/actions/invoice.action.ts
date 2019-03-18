import{Action} from'@ngrx/store';
import { PaginationResponse } from '../../common/core/types/pagination-response';
import { Invoice } from '../../invoices/invoice';

//load customers
export const LOAD_INVOICES='[INVOICES] Load Invoices';
export const UPDATE_INVOICE_RECORD='[UPDATE_INVOICE_RECORD] Update Invoice Record';
export const LOAD_INVOICES_FAIL='[INVOICES] Load Invoices Fail';
export const LOAD_INVOICES_SUCCESSS='[INVOICES] Load Invoices Success';
export const ADD_INVOICE='[INVOICES] Add Invoice';

export class LoadInvoices implements Action{

    readonly type = LOAD_INVOICES;
    constructor(public payload:any){}

}
export class AddInvoice implements Action{

  readonly type = ADD_INVOICE;
  constructor(public payload:Invoice){}
}

export class LoadInvoicesFail implements Action{

  readonly type = LOAD_INVOICES_FAIL;
  constructor(public payload:any){}
}

export class LoadInvoicesSuccess implements Action{

      readonly type = LOAD_INVOICES_SUCCESSS;
      constructor(public payload:PaginationResponse<Invoice>){
      }
}
export class UpdateInvoiceRecord implements Action{

  readonly type = UPDATE_INVOICE_RECORD;
  constructor(public payload:Invoice){
  }
}

// export action types

export type InvoiceAction = LoadInvoices | LoadInvoicesFail | LoadInvoicesSuccess | AddInvoice | UpdateInvoiceRecord;
