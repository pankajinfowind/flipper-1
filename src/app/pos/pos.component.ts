import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation, CalculateTotalClassPipe, Order, Variant,
  STATUS, ORDERTYPE, MainModelService, Branch, Tables, Stock,
   Product,OrderDetails,StockHistory } from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  animations: [
    trigger('insertPos', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class PosComponent  {

  get theVariantFiltered(): Variant[] {
    return this.seTheVariantFiltered;
  }

  set theVariantFiltered(value: Variant[]) {
    this.seTheVariantFiltered = value;
  }

  get currentOrder(): Order {
    return this.setCurrentOrder;
  }

  set currentOrder(value: Order) {
    this.setCurrentOrder = value;
  }

  constructor(private model: MainModelService, private query: ModelService, private totalPipe: CalculateTotalClassPipe) {
  this.init();
  }
  defaultBranch: Branch = this.model.active<Branch>(Tables.business);
  public variants: Variant[] = [];
  private seTheVariantFiltered: Variant[] = [];
  public collectCashCompleted: object = {};

  public currency = 'RWF';
  private setCurrentOrder: Order;

  date = new Date();

init() {
  this.hasDraftOrder();
  this.newOrder();
  this.loadVariants();
}
  generateCode(): string {
    return this.date.getSeconds() + this.date.getHours() + this.date.getDay() + '' +
     '' + this.date.getDate() + '' + this.date.getMonth() + '' + this.date.getFullYear();
  }

  public newOrder() {
      if (!this.setCurrentOrder) {
        const rand = Math.floor(Math.random() * 10);
        this.model.create<Order>(Tables.order, {
          id: rand,
          reference: 'SO' + rand + this.generateCode(),
          orderNumber: 'SO' + rand + this.generateCode(),
          branchId: this.defaultBranch ? this.defaultBranch.id : 0,
          status: STATUS.OPEN,
          orderType: ORDERTYPE.SALES,
          active: true,
          orderItems: [],
          isDraft: true,
          subTotal: 0.00,
          cashReceived: 0.00,
          customerChangeDue: 0.00,
          createdAt: this.date,
          updatedAt: this.date
        });
        this.hasDraftOrder();

        }
      }

      hasDraftOrder(): void {
        this.setCurrentOrder = this.model.draft<Order>(Tables.order, 'isDraft');
        if (this.setCurrentOrder) {
          const orderDetails: OrderDetails[] = this.getOrderDetails(this.setCurrentOrder.id);
          this.setCurrentOrder.orderItems = orderDetails;
        }
      }

      getOrderDetails(orderId: number): OrderDetails[] {
        const orderDetails: OrderDetails[] = [];
        this.model.filters<OrderDetails>(Tables.orderDetails, 'orderId', orderId)
        .forEach(details => {

          const variant: Variant = this.model.find<Variant>(Tables.variants, details.variantId);

          const stock: Stock = this.query.select(Tables.stocks).where('variantId', variant.id)
          .andWhere('branchId', this.defaultBranch.id).first<Stock>();

          const product: Product = this.model.find<Product>(Tables.products, variant.productId);
          if (stock) {
            details.stock = stock;
          }
          if (variant) {
            details.variant = variant;
          }
          if (product) {
            details.product = product;
          }

          orderDetails.push(details);
        });
        return orderDetails;
      }


      public loadVariants() {
         const variants: Variant[] = this.model.loadAll<Variant>(Tables.variants);
         this.variants=[];
         if (variants.length > 0) {
            variants.forEach(variant => {
              const stock: Stock = this.query.select(Tables.stocks).where('variantId', variant.id)
              .andWhere('branchId', this.defaultBranch.id).first<Stock>();

              const product: Product = this.model.find<Product>(Tables.products, variant.productId);

              const variation: Variant = variant;
              variation.productName = product.name;
              if (stock) {
                  variation.stock = stock;
                }
              variation.name = variation.name === 'Regular' ? variation.productName : variation.name;
              variation.priceVariant = {
                      id: 0,
                      priceId: 0,
                      variantId: variation.id,
                      minUnit: 0,
                      maxUnit: 0,
                      retailPrice: stock && stock.retailPrice ? stock.retailPrice : 0.00,
                      supplyPrice: stock && stock.supplyPrice ? stock.supplyPrice : 0.00,
                      wholeSalePrice: stock && stock.wholeSalePrice ? stock.wholeSalePrice : 0.00,
                      discount: 0,
                      markup: 0
                    };
              this.variants.push(variation);
              // if (!stock.canTrackingStock) {
              //   this.variants.push(variation);
              //  } else {
              //       if (stock.canTrackingStock && stock.currentStock > 0) {
              //             this.variants.push(variation);
              //       }
              //  }

            });
         }

      }

      public iWantToSearchVariant(event) {
        if (event) {
          this.theVariantFiltered = this.filterByValue(this.variants, event);
        }

      }


      filterByValue(arrayOfObject: Variant[], term: any) {
        const query = term.toString().toLowerCase();
        return arrayOfObject.filter((v, i) => {
          if (v.name.toString().toLowerCase().indexOf(query) >= 0 || v.SKU.toString().toLowerCase().indexOf(query) >= 0
           ||  v.productName.toString().toLowerCase().indexOf(query) >= 0
           ||  v.priceVariant && v.priceVariant.retailPrice.toString().toLowerCase().indexOf(query) >= 0 ) {
            return true;
          } else {
            return false;
          }
        });
      }

      updateOrderDetails(details: {action: string, item: OrderDetails}) {
        if (details.action === 'DELETE') {
          this.model.delete(Tables.orderDetails, details.item.id);
        }

        if (details.action === 'UPDATE') {
          this.model.update<OrderDetails>(Tables.orderDetails, details.item, details.item.id);
        }

        this.updateOrder();
      }

      public updateOrder() {
        const subtotal = this.totalPipe.transform<OrderDetails>
        (this.model.filters<OrderDetails>(Tables.orderDetails, 'orderId', this.setCurrentOrder.id), 'subTotal');
        this.setCurrentOrder.subTotal = subtotal;
        this.setCurrentOrder.customerChangeDue = this.setCurrentOrder.cashReceived > 0 ?
          parseInt(this.setCurrentOrder.cashReceived, 10) - parseInt(subtotal, 10) : 0.00;
        this.setCurrentOrder.customerChangeDue = this.setCurrentOrder.customerChangeDue;
        this.model.update<Order>(Tables.order, this.setCurrentOrder, this.setCurrentOrder.id);
        this.hasDraftOrder();
      }


      public addToCart(variant: Variant) {
        const orderDetails: OrderDetails = {
          price: variant.priceVariant.retailPrice,
          variantName: variant.name,
          productName: variant.productName,
          canTrackStock: variant.stock.canTrackingStock,
          stockId: variant.stock.id,
          unit: variant.unit,
          SKU: variant.SKU,
          quantity: 1,
          variantId: variant.id,
          orderId: this.setCurrentOrder.id,
          subTotal: variant.priceVariant.retailPrice,
          createdAt: this.date,
          updatedAt: this.date
        };
        this.model.create<OrderDetails>(Tables.orderDetails, orderDetails);
        this.setCurrentOrder.orderItems = this.getOrderDetails(this.setCurrentOrder.id);
        this.updateOrder();

      }

      didCollectCash(event) {
        this.collectCashCompleted = { isCompleted: false, collectedOrder: this.currentOrder };
        if (event === true) {
         this.createStockHistory();
         this.currentOrder.isDraft = false;
         this.currentOrder.status = STATUS.COMPLETE;
         this.collectCashCompleted = { isCompleted: true, collectedOrder: this.currentOrder };

         this.model.update<Order>(Tables.order, this.currentOrder, this.currentOrder.id);
         this.init();

        }

      }

      createStockHistory() {

        const orderDetails: OrderDetails[] = this.getOrderDetails(this.currentOrder.id);
        if (orderDetails.length) {
          orderDetails.forEach(details => {

            const stock=details;
            if (stock.stock && stock.stock.id > 0) {
              this.model.create<StockHistory>(Tables.stockHistory, {
                orderId: stock.orderId,
                variantId: stock.variantId,
                variantName: stock.variantName,
                stockId: stock.stock.id,
                reason: 'Sold',
                quantity: stock.quantity,
                isDraft: false,
                isPreviously: false,
                syncedOnline: false,
                note: 'Customer sales',
                createdAt: new Date(),
                updatedAt: new Date()
               });

              this.updateStock(stock);
            } else {
              console.log('no stock found');
            }

          });
        } else {
console.log('no order details');
        }

      }
      updateStock(stockDetails: OrderDetails) {
        if (stockDetails.stock && stockDetails.stock.id) {
          stockDetails.stock.currentStock = stockDetails.stock.currentStock - stockDetails.quantity;
          this.model.update<Stock>(Tables.stocks, stockDetails.stock, stockDetails.stock.id);
        }

      }

      saveOrderUpdated(event: Order) {
         this.model.update<Order>(Tables.order, event, event.id);
         this.hasDraftOrder();
      }
    }

