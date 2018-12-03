export class Insurance {
  name:string;
  id?:number;
  discount?:number;
  country?:string;
  address?:string;
  logo_url?:string
  insurance_id?:number;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
