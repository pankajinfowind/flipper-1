import { Orders } from './orders/orders';


export class Pos {
  id?:number;
  loading:boolean;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
