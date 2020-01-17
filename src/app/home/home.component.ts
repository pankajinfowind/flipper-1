import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  OrderEvent,
  STATUS,
  ORDERTYPE,
  Order,
  VariantEvent,
  Variant,
  Shoppings,
  CalculateTotalClassPipe,
  MenuEntries,
  DashBoardEntries
} from '@enexus/flipper-components';
import {
  FlipperEventBusService
} from '@enexus/flipper-event';
import {
  filter
} from 'rxjs/operators';
// import { MockMenu } from '../mock-data/menu';
import { MockDashboard } from '../mock-data/dashboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  private selectedSubscription: Subscription;
  private variantSubscription: Subscription;
  private shoppingSubscription: Subscription;
  canfoundVariant: Variant[] = [];
  isCurrentOrder: Order;
  public variants: Variant[] = [];
  public shoppings: Shoppings[] = [];
  public collectCashCompleted: object = {};
  currency = 'RWF';

  entries:MenuEntries = null;
  dashboardEntries: DashBoardEntries = MockDashboard.data;

  constructor(private eventBus: FlipperEventBusService, private totalPipe: CalculateTotalClassPipe) {
    console.log(this.dashboardEntries);
    this.selectedSubscription = this.eventBus.of < OrderEvent > (OrderEvent.CHANNEL)
      .pipe(filter(e => e.order.isActive === true))
      .subscribe(res =>
        this.currentOrder = res.order);

    this.variantSubscription = this.eventBus.of < VariantEvent > (VariantEvent.CHANNEL)
      .pipe(filter(e => e.variant.isActive === true))
      .subscribe(variant => {
        if (variant.variant) {
          this.variants.push(variant.variant);
        }
      });

    this.newVariant();
    if (!this.currentOrder) {
      this.newOrder();
    }

  }

  get foundVariant(): Variant[] {
    return this.canfoundVariant;
  }

  set foundVariant(value: Variant[]) {
    this.canfoundVariant = value;
  }

  get gotShopping(): Shoppings[] {
    return this.shoppings;
  }

  set gotShopping(value: Shoppings[]) {
    this.shoppings = value;
  }

  get currentOrder(): Order {
    return this.isCurrentOrder;
  }

  set currentOrder(value: Order) {
    this.isCurrentOrder = value;
  }


  public newOrder() {
    const rand = Math.floor(Math.random() * 100) + 1;
    this.eventBus.publish(new OrderEvent({
      id: rand,
      reference: 'SO' + rand,
      orderNumber: 'SO' + rand,
      branchId: 1,
      status: STATUS.OPEN,
      orderType: ORDERTYPE.SALES,
      isActive: true,
      orderItems: [],
      subTotal: 0.00,
      cashReceived: 0.00,
      customerChangeDue: 0.00
    }));
  }

  public addOrderItem(item) {

    this.currentOrder.orderItems.push(item);
    this.currentOrder.subTotal = this.totalPipe.transform < Shoppings >
    (this.currentOrder.orderItems, 'subTotal');
    this.currentOrder.customerChangeDue = this.currentOrder.cashReceived > 0 ?
     this.currentOrder.cashReceived - this.totalPipe.transform < Shoppings >
      (this.currentOrder.orderItems, 'subTotal') : 0.00;
    this.currentOrder.customerChangeDue = this.currentOrder.customerChangeDue;
    this.eventBus.publish(new OrderEvent(
      this.currentOrder
    ));
  }
  public newVariant() {
    const rand = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < 10; i++) {
      this.eventBus.publish(new VariantEvent({
        id: rand + i,
        sku: '157115276' + i,
        name: 'Cake-' + i,
        isActive: true,
        priceVariant: {
          id: i,
          priceId: i,
          variantId: rand + i,
          minUnit: 0,
          maxUnit: 0,
          retailPrice: 500 + (i),
          supplyPrice: (i) + 50,
          wholeSalePrice: 50 + i,
          discount: 2,
          markup: 1
        }
      }));
    }

  }



  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
    this.variantSubscription.unsubscribe();
    this.shoppingSubscription.unsubscribe();
  }


  public searchPosVariant(event) {
    if (event) {
      this.foundVariant = this.filterByValue(this.variants, event);
    }

  }

  public addToCart(event: Variant) {

    const rand = Math.floor(Math.random() * 100) + 1;
    this.addOrderItem({
      id: rand,
      price: event.priceVariant.retailPrice,
      variantName: event.name,
      quantity: 1,
      variantId: event.id,
      orderId: this.currentOrder.id,
      subTotal: event.priceVariant.retailPrice
    });

  }

  saveOrderUpdated(event) {
    console.log('saved order', event);
  }
  didCollectCash(event) {
    // console.log("didCollectCash",event);
    this.collectCashCompleted = {isCompleted: false, collectedOrder: this.currentOrder};
    if (event === true) {
      this.collectCashCompleted = {isCompleted: true, collectedOrder: this.currentOrder};
      this.currentOrder = null;
      if (!this.currentOrder) {
        this.newOrder();
      }
    }
  }


  filterByValue(arrayOfObject, term) {
    const query = term.toString().toLowerCase();
    return arrayOfObject.filter((v, i) => {
      if (v.name.toString().toLowerCase().indexOf(query) >= 0 || v.sku.toString().toLowerCase().indexOf(query) >= 0) {
        return true;
      } else {
        return false;
      }
    });
  }


}
