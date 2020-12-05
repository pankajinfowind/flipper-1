import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core'
import { CalculateTotalClassPipe, Order } from '@enexus/flipper-components'
import { Subscription } from 'rxjs'
import { TransactionsService } from '../transactions.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.scss'],
})
export class ListTransactionsComponent implements OnInit, OnDestroy {
  readonly displayedColumns: string[] = ['orderNumber', 'details', 'subTotal', 'createdAt']
  loading = true
  dataSource: MatTableDataSource<Order>
  selectedRow: Order | null

  @Output() selectedRowEmit = new EventEmitter<Order>()
  @Output() currencyEmit = new EventEmitter<string>()

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  private subscription: Subscription
  public currency = 'RWF'
  searching: string
  @Input('applySearch')
  set applySearch(value: string) {
    this.searching = value
    this.applyFilter(value)
  }

  get applySearch(): string {
    return this.searching
  }

  grandTotal = 0

  constructor(private totalPipe: CalculateTotalClassPipe, public transaction: TransactionsService) {
    this.dataSource = new MatTableDataSource([])
    this.subscription = this.transaction.transactionSubject.subscribe(
      loadAllTransactions => (this.loadAllTransactions = loadAllTransactions)
    )
  }

  ngOnInit() {
    this.currency = this.transaction.currency
    this.refresh()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  refresh() {
    this.loading = true
    this.transaction.loadAllTransactions().subscribe()
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase()

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage()
      }
    } else {
      this.refresh()
    }
  }

  doSelect(row: Order) {
    this.selectedRow = row
    this.selectedRowEmit.emit(row)
    this.currencyEmit.emit(this.currency)
  }

  set loadAllTransactions(hosts: Order[]) {
    this.dataSource = new MatTableDataSource(hosts)
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.loading = false
  }

  getGrandTotal() {
    return this.totalPipe.transform(this.dataSource.data, 'saleTotal')
  }

  getNetSaleTotal() {
    return this.totalPipe.transform(this.dataSource.data, 'subTotal')
  }

  // saleTotal
}
