import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashBoardEntries, fadeInAnimation, MainModelService, Business, Tables, Stock,
  Branch, CalculateTotalClassPipe, RoundNumberPipe, Order, OrderDetails,
   Variant, Product, Taxes } from '@enexus/flipper-components';
import { trigger, transition, useAnimation } from '@angular/animations';
import { ModelService } from '@enexus/flipper-offline-database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('insertDashboard', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class DashboardComponent {


  dashboardEntries: DashBoardEntries;


  public branch: Branch | null;
  public totalStore = 0.00;
  public netProfit = 0.00;
  public grossProfits = 0.00;
  public totalRevenue = 0.00;

  public topSoldItem = [];
  public lowStockItem=[];
  public currency = this.model.active<Business>(Tables.business) ? this.model.active<Business>(Tables.business).currency : 'RWF';
  constructor(private totalPipe: CalculateTotalClassPipe,
              private radomNumberPipe: RoundNumberPipe,
              private query: ModelService, private model: MainModelService) {

                console.log(this.model.findByFirst<Taxes>(Tables.taxes, 'isDefault', true));
                
              this.branch = this.model.active<Branch>(Tables.branch);
              this.totalStore = this.getStockValue();
              this.netProfit = this.getNetProfit();
              this.totalRevenue = this.getTotalRevenues();
              this.grossProfits = this.getGrossProfit();
              this.topSoldItem = this.topSoldItems();
              this.lowStockItem = this.getLowStocks();

  }



  topSoldItems() {
    const topSolds=[];
    if(this.topSoldsItem().length > 0) {
      this.topSoldsItem().forEach((item: OrderDetails,i)=> {

        if(item.quantity) {
          const x= {
            id: i+1,
            name: item.variantName,
            updatedAt: 'Updated 5m ago',
            items: item.quantity,
            total: item.subTotal
          };
          topSolds.push(x);
        }

      });
    }

    return topSolds;
  }


  getStockValue() {
    return this.radomNumberPipe.transform(this.stockValue());
  }
  stockValue() {
    const stocks: Stock[] = this.stocks();
    const results = [{ retailPrice: 0 }];

    if (stocks.length > 0) {
      stocks.forEach(result => {
        results.push({ retailPrice: result.currentStock * result.retailPrice });
      });
    }

    return this.totalPipe.transform(results, 'retailPrice');

  }
  grossProfit() {
    const stocks = this.getSaleStocks();
    return this.totalPipe.transform(stocks, 'grossProfit');
  }

  getGrossProfit() {
    return this.radomNumberPipe.transform(this.grossProfit());
  }


  getNetProfit() {
    const stocks = this.getSaleStocks();
    return this.radomNumberPipe.transform(this.totalPipe.transform(stocks, 'netProfit'));
  }


  totalRevenues() {
    const sales: Order[] =this.sales();
    return this.totalPipe.transform(sales, 'saleTotal');
  }
  getTotalRevenues() {
    return this.radomNumberPipe.transform(this. totalRevenues());
  }

  stocks() {
    return this.query.queries<Stock>(Tables.stocks, ` branchId="${this.branch.id}" AND currentStock > 0 AND canTrackingStock=true`);
  }

  sales() {
    return this.query.queries<Order>(Tables.order, ` branchId="${this.branch.id}" AND orderType='sales' AND status='complete'`);
  }

  getLowStocks() {
    const lowStocks=[];
    const stocks: Stock[]=this.query.queries<Stock>(Tables.stocks, ` branchId="${this.branch.id}" AND canTrackingStock=true ORDER BY currentStock ASC`);
    stocks.forEach((stock,i)=> {
      if(i < 6) {
        if(stock.lowStock && stock.currentStock < stock.lowStock) {
          const variant=this.model.find<Variant>(Tables.variants,stock.variantId);
          const product=this.model.find<Product>(Tables.products,variant.productId);
          lowStocks.push({
            id: stock.id,
            name: variant.name==='Regular'?product.name:variant.name,
            updatedAt: stock.updatedAt,
            currentStock: stock.currentStock
          });
        }
      }

    });
    return lowStocks;
  }

  getSaleStocks() {
    let stocks = [{ netProfit: 0, grossProfit: 0 }];
    if (this.loadSales().length > 0) {
        stocks=[];
        this.loadSales().forEach(orderDetails => {
          if (orderDetails && orderDetails.stockId) {

            stocks.push(this.loadOrderDetails(orderDetails));
          }
        });
      }
    return stocks;
  }


  loadSales() {
    const orderItems: OrderDetails[]=[];
    const details: OrderDetails[]= this.model.loadAll<OrderDetails>(Tables.orderDetails);
    this.sales().forEach(sale => {
      if (sale) {
        details.forEach(d=> {
          if((!orderItems.find(dd=>dd.id===d.id)) && d.orderId===sale.id) {
            orderItems.push(d);
          }
        });
      }
    });

    return orderItems;

  }

  loadOrderDetails(orderDetails: OrderDetails) {
    const stock: Stock = this.model.find<Stock>(Tables.stocks, orderDetails.stockId);
    return { netProfit: orderDetails.subTotal-(orderDetails.quantity * stock.supplyPrice),
              grossProfit: (orderDetails.taxAmount+orderDetails.subTotal)-(orderDetails.quantity * stock.supplyPrice) };
  }

   topSoldsItem(): OrderDetails[] {

    const ids=[];
    const orderIds: Order[]=this.model.raw(`SELECT id
    FROM orders WHERE branchId="${this.branch.id}"
    ORDER BY updatedAt DESC LIMIT 5`) as Order[];

    orderIds.forEach(d=> {
      ids.push(`'${d.id}'`);
    });

    return this.model.raw(`SELECT *
     FROM orderDetails WHERE  orderDetails.quantity > 0 AND orderId IN (${ids.join()}) ORDER BY updatedAt DESC LIMIT 5`);
  }
}
