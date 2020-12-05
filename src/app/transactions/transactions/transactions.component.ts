import { Component, OnInit, Input } from '@angular/core'
import { trigger, transition, useAnimation } from '@angular/animations'
import { fadeInAnimation, Order } from '@enexus/flipper-components'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [
    trigger('insertTrans', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})
export class TransactionsComponent implements OnInit {
  openOrderDetails = false

  selectRow: Order | null
  public myCurrency = 'RWF'
  constructor() {}

  ngOnInit() {}

  selectedRow(row: Order) {
    if (row) {
      this.openOrderDetails = true
      this.selectRow = row
    } else {
      this.openOrderDetails = false
      this.selectRow = null
    }
  }
  currency(event: string) {
    this.myCurrency = event
  }
  closeOrderDetails(bol: boolean) {
    this.openOrderDetails = bol
  }
}
