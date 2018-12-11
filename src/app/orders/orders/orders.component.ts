import { Component, OnInit } from '@angular/core';
import { Orders } from '../orders';
import { Observable } from 'rxjs';
import { OrderModelService } from '../order-model.service';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order$: Observable<Orders[]>;
  pos$: Observable<Pos>;
  constructor(private orderModelService:OrderModelService,private posModelService:PosModelService) { }

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.order$ = this.orderModelService.order$;
  }
  updatePosLayout(panel='home'){
    this.posModelService.update({panel_content:panel});
  }
}
