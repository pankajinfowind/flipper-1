import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TransactionRoutingModule } from './transaction-routing.module'
import { TransactionsComponent } from './transactions/transactions.component'
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component'
import { SharedModule } from '../shared/shared.module'
import { ListTransactionsComponent } from './list-transactions/list-transactions.component'

@NgModule({
  declarations: [TransactionsComponent, TransactionDetailsComponent, ListTransactionsComponent],
  imports: [CommonModule, SharedModule, TransactionRoutingModule],
})
export class TransactionsModule {}
