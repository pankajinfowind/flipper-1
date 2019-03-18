import{CustomerEffects} from'./customer.effect';
import { OrderEffects } from './order.effect';
import { InvoiceEffects } from './invoice.effect';


export const effect:any[]=[CustomerEffects,OrderEffects,InvoiceEffects];
export * from './customer.effect';
export * from './order.effect';
export * from './invoice.effect';
