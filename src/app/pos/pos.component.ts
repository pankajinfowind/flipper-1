import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  fadeInAnimation, CalculateTotalClassPipe, Order,
  STATUS, ORDERTYPE, MainModelService, Branch, Tables, Stock,
  Product, OrderDetails, StockHistory, Business, Taxes, PouchDBService, PouchConfig, Variant } from '@enexus/flipper-components';
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
export class PosComponent {

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
  public branch: Branch | null;

  constructor(private model: MainModelService,
              private database: PouchDBService,
              private query: ModelService, private totalPipe: CalculateTotalClassPipe) {
      this.branch = this.model.active<Branch>(Tables.branch);
      this.init();
      this.database.connect(PouchConfig.bucket);
      if (PouchConfig.canSync) {
     this.database.sync(PouchConfig.syncUrl);
   }
  }
  defaultBranch: Branch = this.model.active<Branch>(Tables.branch);
  public variants: Variant[] = [];
  private seTheVariantFiltered: Variant[] = [];
  public collectCashCompleted: object = {};

  public currency = this.model.active<Business>(Tables.business) ? this.model.active<Business>(Tables.business).currency : 'RWF';
  private setCurrentOrder: Order;

  date = new Date();

  init() {
    this.hasDraftOrder();
    this.newOrder();
    // this.loadVariants();
    if (this.currentOrder) {
      this.getOrderDetails(this.currentOrder.id);
    }
  }

  makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateCode(): string {
    return this.makeid(5);
  }

  public newOrder() {
    if (!this.setCurrentOrder) {

      this.model.create<Order>(Tables.order, {
        id: this.database.uid(),
        reference: 'SO' + this.generateCode(),
        orderNumber: 'SO' + this.generateCode(),
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
        let stock: Stock = null;
        let variant: Variant = null;
        let product: Product = null;
        variant = this.model.find<Variant>(Tables.variants, details.variantId);
        if (variant) {
          stock = this.query.select(Tables.stocks).where('variantId', variant.id)
            .andWhere('branchId', this.defaultBranch.id).first<Stock>();
        }

        if (variant) {
          product = this.model.find<Product>(Tables.products, variant.productId);
        }

        details.stock = stock;
        details.variant = variant;
        details.product = product;


        orderDetails.unshift(details);
      });
    return orderDetails;
  }


  public loadVariants(param=null) {

  
  // const products: Product[]= this.model.raw(`SELECT branchProducts.branchId,branchProducts.productId,products.id,branchProducts.id as branchProductId
  //             FROM branchProducts JOIN products ON branchProducts.productId = products.id AND branchProducts.branchId="${this.branch.id}"
  //             ORDER BY products.id DESC
  //             `) as Product[];
              // products.forEach(product => {
               
              //   const variant: Variant = this.query.select(Tables.variants).where('productId', product.id)
              //   .first<Variant>();
              //   variants.push(variant);
              // });
//
      // this.theVariantFiltered=[];
      // this.variants=[];
let variantsArray:Variant[]=[];
const variants:Variant[]= this.model.raw(`SELECT
 products.id as pId,
 variants.id,
 products.name as pName,
 variants.name,
 variants.SKU,
 variants.unit,
 variants.channel,
 variants.productId,
 variants.createdAt,
 variants.updatedAt
 FROM variants,products WHERE variants.productId = products.id  AND  (products.name LIKE "%${param}%" OR variants.name LIKE "%${param}%" OR variants.SKU="${param}") `);
        

  if (variants.length > 0) {

      variants.forEach(variant => {
        
         const stock: Stock = this.query.select(Tables.stocks).where('variantId', variant.id)
          .first<Stock>();
        
         if (stock) {
          const product: Product = this.model.find<Product>(Tables.products, variant.productId);

          const variation: Variant = this.model.find<Variant>(Tables.variants, variant.id);

          variation.productName = product.name;

          if (stock) {
              variation.stock = stock;
          }

          variation.name = variation.name === 'Regular' ? variation.productName+' - Regular' : variation.name;

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

          if (stock.canTrackingStock===false) {
            variantsArray.push(variation);
          } else {
            if (stock.canTrackingStock===true && stock.currentStock > 0) {
              variantsArray.push(variation);
            }
          }
        }


      });
    }
    return variantsArray;

  }

  public iWantToSearchVariant(event) {
    
    if (event) {
      
     const results= this.loadVariants(event.toString());
      // console.log(results);

        if(results.length > 0){
          this.theVariantFiltered = results; //this.filterByValue(this.variants, event);
        }
      
    }

  }


  filterByValue(arrayOfObject: Variant[], term: any) {
    const query = term.toString().toLowerCase();
    return arrayOfObject.filter((v, i) => {
      // console.log(v);
      if (v.name.toString().toLowerCase().indexOf(query) >= 0
        || v.SKU.toString().toLowerCase().indexOf(query) > 0
        || v.productName.toString().toLowerCase().indexOf(query) >= 0
       ) {
        return true;
      } else {
        return false;
      }
    });
  }

  updateOrderDetails(details: { action: string, item: OrderDetails }) {
    if (details.action === 'DELETE') {
      this.model.delete(Tables.orderDetails, `'${details.item.id}'`);
    }

    if (details.action === 'UPDATE') {
      details.item.price = parseFloat(details.item.price);
      details.item.quantity = details.item.quantity;

      const taxRate=details.item.taxRate?details.item.taxRate:0;
      const subTotal=details.item.price * details.item.quantity;

      details.item.taxAmount = (subTotal * taxRate) / 100;
      details.item.subTotal = subTotal;
      this.model.update<OrderDetails>(Tables.orderDetails, details.item, details.item.id);
    }

    this.updateOrder();
  }

  public updateOrder() {
    const subtotal = parseFloat(this.totalPipe.transform<OrderDetails>
      (this.model.filters<OrderDetails>(Tables.orderDetails, 'orderId', this.setCurrentOrder.id), 'subTotal'));
    const taxAmount = parseFloat(this.totalPipe.transform<OrderDetails>
      (this.model.filters<OrderDetails>(Tables.orderDetails, 'orderId', this.setCurrentOrder.id), 'taxAmount'));
    this.setCurrentOrder.subTotal = subtotal;

    this.setCurrentOrder.taxAmount = taxAmount;
    this.setCurrentOrder.saleTotal = subtotal + taxAmount;

    this.setCurrentOrder.customerChangeDue = this.setCurrentOrder.cashReceived > 0 ?
      parseFloat(this.setCurrentOrder.cashReceived) - this.setCurrentOrder.saleTotal : 0.00;
    this.setCurrentOrder.customerChangeDue = parseFloat(this.setCurrentOrder.customerChangeDue);
    this.model.update<Order>(Tables.order, this.setCurrentOrder, this.setCurrentOrder.id);
    this.hasDraftOrder();
  }


  public addToCart(event: any) {
    const variant: Variant = event.variant;
    let taxRate = 0;
    let product = null;
    let tax = null;
    // console.log(variant);
    if (variant.productId) {
      product = this.model.find<Product>(Tables.products, variant.productId);
      // console.log(product);
      if (product) {
        tax = this.model.find<Taxes>(Tables.taxes, product.taxId)?this.model.find<Taxes>(Tables.taxes, product.taxId).percentage:0;
        // console.log(tax);
      } else {
        tax = 0;
      }
    } else {
      tax = event.tax?event.tax:0;
    }

    taxRate = event.tax?event.tax:tax ? tax : 0;

    const orderDetails: OrderDetails = {
      id: this.database.uid(),
      price: variant.priceVariant.retailPrice,
      variantName: variant.name,
      productName: variant.productName,
      canTrackStock: variant.stock.canTrackingStock,
      stockId: variant.stock.id,
      unit: variant.unit,
      SKU: variant.SKU,
      quantity: event.quantity,
      variantId: variant.id,
      taxRate,
      taxAmount: ((variant.priceVariant.retailPrice * event.quantity) * taxRate) / 100,
      orderId: this.setCurrentOrder.id,
      subTotal: variant.priceVariant.retailPrice * event.quantity,
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
      this.currentOrder.active = false;
      this.currentOrder.status = STATUS.COMPLETE;
       this.currentOrder.createdAt = new Date();
       this.currentOrder.updatedAt = new Date();
       
      this.model.update<Order>(Tables.order, this.currentOrder, this.currentOrder.id);
      const formOrder= {
        active: this.currentOrder.active,
        branchId:this.currentOrder.branchId,
        cashReceived: this.currentOrder.cashReceived,
        createdAt: this.currentOrder.createdAt,
        customerChangeDue: this.currentOrder.customerChangeDue,
        id: this.currentOrder.id,
        isDraft: this.currentOrder.isDraft,
        orderNumber: this.currentOrder.orderNumber,
        orderType: this.currentOrder.orderType,
        reference: this.currentOrder.reference,
        saleTotal: this.currentOrder.saleTotal,
        status: this.currentOrder.status,
        subTotal: this.currentOrder.subTotal,
        taxAmount: this.currentOrder.taxAmount,
        updatedAt:this.currentOrder.updatedAt,
        customerId:'',
        currency:this.currency,
        supplierInvoiceNumber:'',
        discountAmount:'',
        paymentId:'',
        orderNote:'',
        deliverDate: '',
        deviceId:'',
        orderDate: new Date(),

      };
      this.database.put(PouchConfig.Tables.orders,{orders:[formOrder]});
      const orderDetails=[];
      this.getOrderDetails(this.currentOrder.id).forEach(details=> {
        orderDetails.push(
        {
          canTrackStock:details.stockId?true:false,
          createdAt: details.createdAt,
          id: details.id,
          orderId: details.orderId,
          price: details.price,
          productName: details.productName?details.productName:'Custom',
          quantity: details.quantity,
          stockId: details.stockId?details.stockId:'',
          subTotal: details.subTotal,
          taxAmount: details.taxAmount,
          taxRate: details.taxRate,
          unit: details.unit?details.unit:'',
          updatedAt: details.updatedAt,
          discountRate:0,
          discountAmount:0,
          variantId: details.variantId?details.variantId:'',
          variantName: details.variantName?details.variantName:'Custom',
          note:''
        });
      });

      this.database.put(PouchConfig.Tables.orderDetails,{orderDetails});
      this.collectCashCompleted = { isCompleted: true, collectedOrder: this.currentOrder };
      this.currentOrder = null;
      this.init();

    }

  }

  createStockHistory() {

    const orderDetails: OrderDetails[] = this.getOrderDetails(this.currentOrder.id);
    const stockIds: string[]=[];
    if (orderDetails.length) {

      orderDetails.forEach(details => {

        if (details.stockId > 0 || (details.stock && details.stock.canTrackingStock)) {
          this.model.create<StockHistory>(Tables.stockHistory, {
            orderId: details.orderId,
            variantId: details.variantId,
            variantName: details.variantName,
            stockId: details.stockId,
            reason: 'Sold',
            quantity: details.quantity,
            isDraft: false,
            isPreviously: false,
            syncedOnline: false,
            note: 'Customer sales',
            createdAt: new Date(),
            updatedAt: new Date()
          });
          stockIds.push(`'${details.stockId}'`);
          this.updateStock(details);
        }

      });

      this.database.put(PouchConfig.Tables.stockHistories,{stockHistory:
        this.model.filters<StockHistory>(Tables.stockHistory,'orderId',this.currentOrder.id)});
      this.database.put(PouchConfig.Tables.stocks,{
        stocks:this.query.queries(Tables.stocks, `  id IN (${stockIds.join()})`)});

    }

  }
  updateStock(stockDetails: OrderDetails) {
    let stockId = 0;
    if (stockDetails.stockId && (stockDetails.stockId!==null || stockDetails.stockId!==undefined)) {
      stockId = stockDetails.stockId;
    } else if (stockDetails.stock && stockDetails.stock.id) {
      stockId = stockDetails.stock.id;
    } else {
      stockId = 0;
    }

    const stock: Stock = this.model.find<Stock>(Tables.stocks, stockId);
    if (stock) {
      stock.currentStock = stock.currentStock - stockDetails.quantity;
      this.model.update<Stock>(Tables.stocks, stock, stock.id);
    }

  }

  saveOrderUpdated(event: Order) {
    this.model.update<Order>(Tables.order, event, event.id);
    this.hasDraftOrder();
  }

}


