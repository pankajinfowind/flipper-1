import { Injectable } from '@angular/core'
import { Order, Tables, OrderDetails, Business, Branch } from '@enexus/flipper-components'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { ModelService } from '@enexus/flipper-offline-database'

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public transactionSubject: BehaviorSubject<Order[]>
  private readonly transactionMap = new Map<string, Order>()
  public branch: Branch | null
  public currency = 'RWF'
  constructor() {
    this.transactionSubject = new BehaviorSubject([])
    this.branch = null
  }

  public loadAllTransactions(): Observable<Order[]> {
    const data: Order[] = []

    // this.query.queries<Order>(Tables.order, ` branchId="${this.branch.id}" AND orderType='sales' AND status='complete' ORDER BY updatedAt DESC`).
    // forEach(d => {
    //   d.orderItems=this.loadOrderDetails(d.id).length > 0?this.loadOrderDetails(d.id):[];
    //   d.branch=this.model.find<Branch>(Tables.branch,d.branchId);
    //   data.push(d as Order);
    // });

    // this.transactionSubject.next(data);
    // this.transactionMap.clear();
    // data.forEach(product => this.transactionMap.set(product.id as any, product));
    return of(data)
  }

  public host(id: string): Order | undefined {
    return this.transactionMap.get(id)
  }

  loadOrderDetails(orderId: number) {
    return 0
  }
}
