import { Component, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation, CalculateTotalClassPipe, OrderEvent, VariantEvent, Order, Variant, STATUS, ORDERTYPE, Shoppings } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  animations: [
    trigger('insertPos', [
      transition(':enter', useAnimation(fadeInAnimation, {params: {duration: '1s'}}))
    ]),
  ],
})
export class PosComponent implements OnDestroy {
  private selectedSubscription: Subscription;
  private variantSubscription: Subscription;
  private seTheVariantFiltered: Variant[] = [];
  public variants: Variant[] = [];
  public collectCashCompleted: object = {};
  public currency = 'RWF';
  private setCurrentOrder: Order;

  get currentOrder(): Order {
    return this.setCurrentOrder;
  }

  set currentOrder(value: Order) {
    this.setCurrentOrder = value;
  }
  get theVariantFiltered(): Variant[] {
    return this.seTheVariantFiltered;
  }

  set theVariantFiltered(value: Variant[]) {
    this.seTheVariantFiltered = value;
  }
  constructor(private eventBus: FlipperEventBusService, 
              private totalPipe: CalculateTotalClassPipe) {
   
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


        this.loadTenVariants();
        
        if (!this.currentOrder) {
          this.newOrder();
        }

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

  public loadTenVariants() {
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

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
    this.variantSubscription.unsubscribe();
  }

  public iWantToSearchVariant(event) {
    if (event) {
      this.theVariantFiltered = this.filterByValue(this.variants, event);
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

  didCollectCash(event) {
    this.collectCashCompleted = {isCompleted: false, collectedOrder: this.currentOrder};
    if (event === true) {
      this.collectCashCompleted = {isCompleted: true, collectedOrder: this.currentOrder};
      this.currentOrder = null;
      if (!this.currentOrder) {
        this.newOrder();
      }
    }
  }
 saveOrderUpdated(event) {
    console.log('saved order', event);
  }

}
