export class Details {
sender_data?:any={};
receriver_data?:any;
detailsVisible:boolean=false;
action?:any=null;
title?:string=null;
component?:string=null;
module?:string=null;
reason?:string=null
constructor(params: Object = {}) {
  for (let name in params) {
      this[name] = params[name];
  }
}
}
