import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pos } from '../pos';
import { PosModelService } from '../pos-model.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  pos$: Observable<Pos>;
  constructor(private posModelService:PosModelService,) { }

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
  }

}
