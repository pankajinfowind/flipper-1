import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { Orders } from '../../orders';
import { MatSort, MatDialog } from '@angular/material';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { BehaviorSubject, Observable } from 'rxjs';
import { Business } from '../../../business/api/business';
import { CurrentUser } from '../../../common/auth/current-user';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrdersApiIndexParams } from '../../../store/model/pos-order-state-model';
import { SET_POS_ORDER_ORDERBY, SET_POS_ORDER_ORDERDIR } from '../../../store/model/pos-order-state';
import { Store, Select } from '@ngxs/store';
import { LoadOrderEntries, CurrentOrder } from '../../../store/actions/pos-Order.action';
import { PosOrderState } from '../../../store/states/PosOrderStates';
import { ApiPosService } from '../../../pos/api/api.service';
import { Invoice } from '../../../invoices/invoice';
import { PreviewOrderInvoiceComponent } from '../preview-order-invoice/preview-order-invoice.component';
@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class OrderListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<Orders>;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Orders>();
  public loading = new BehaviorSubject(false);
  @Input() public url:string='pending';
  business: Business;
  @Input() public status:string;

  @Select(PosOrderState.entries) entries$: Observable<Orders[]>;
  @Select(PosOrderState.meta) meta$: Observable<any>;

  @Select(PosOrderState.loading) loading$: Observable<boolean>;
  panelOpenState:boolean=false;
  constructor(public dialog: MatDialog,private router: Router,private api: ApiPosService,private store:Store,public currentUser: CurrentUser,public paginator: UrlAwarePaginator) { }

  ngOnInit() {
    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
    }
    this.loadOrder();
  }

  loadOrder(){
    const queryParams:Partial<OrdersApiIndexParams>={
      order_by:SET_POS_ORDER_ORDERBY?SET_POS_ORDER_ORDERBY:'updated_at',
      order_dir: SET_POS_ORDER_ORDERDIR?SET_POS_ORDER_ORDERDIR:'desc',
      categoryId:  '0',
      query: null,
      type: null,
      per_page: 30,
      page: 0,
      url:this.url
      };
      this.store.dispatch(new LoadOrderEntries(queryParams));
  }

  ngOnDestroy() {
    this.paginator.destroy();
  }

  total(data, arg) {
    var total = 0;
    if (data.length > 0) {
      for (var i = 0, _len = data.length; i < _len; i++) {
        total += data[i][arg];
      }
    }

    return total;

  }

  updateHeldOrder(order) {
    order.status = "pending";
    order.is_currently_processing = 1;
    this.updateOrder(order);
    this.loadOrder();
    return this.router.navigate(['/admin/pos/till-categories']);
  }
  updateResumedOrder(order){
    order.status = "pending";
    order.is_currently_processing = 1;
    this.updateOrder(order);
    this.loadOrder();
    return this.router.navigate(['/admin/pos/till-categories']);
  }

  updateOrder(params:Orders) {
    this.api.updateOrder(params, params.id).subscribe(
      res => {
          this.store.dispatch(new CurrentOrder());
      },
      _error => {
        console.error(_error);
      }
    );
  }
  deleteOrdered(order) {
    let result = confirm("Are you sure,you want to delete this current transction?");
    if (result) {
      this.api.deleteOrder(order.id).subscribe(
        res => {
          if (res.status == 'success') {
            if(res['deleted']){
              this.store.dispatch(new CurrentOrder());
              this.loadOrder();
            }
          }
        },
        _error => {
          console.error(_error);
        }
      );
    }
  }
  public showPreviewInvoiceModal(invoice?: Invoice) {
    this.dialog.open(PreviewOrderInvoiceComponent, {
      width: '1200px',
      data: invoice?invoice:null
    });
  }
}
