import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { Pay } from '../pay';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent {
  // pay$: Observable<Pay>;
  // pos$: Observable<Pos>;
  // panelOpenState = false;
  // constructor(private orderItemModelService:OrderItemsModelService,private orderModelService:OrderModelService,private posModelService:PosModelService) { }

  // ngOnInit() {
  //   this.pos$ = this.posModelService.pos$;
  //   this.pay$ = this.orderModelService.pay$;

  // }
  // updatePosLayout(panel='home'){
  //   this.posModelService.update({panel_content:panel});
  // }
  // total(data){
  //   var total=0;
  //     if(data.length > 0){
  //         for ( var i = 0, _len = data.length; i < _len; i++ ) {
  //           total += data[i]['total_amount'];
  //         }
  //     }

  //     return total;

  //   }

  pay(){
// ?
  }

}
