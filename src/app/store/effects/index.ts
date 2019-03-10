import{CustomerEffects} from'./customer.effect';
import { OrderEffects } from './order.effect';


export const effect:any[]=[CustomerEffects,OrderEffects];
export * from './customer.effect';
export * from './order.effect';
