import { Component, OnInit } from '@angular/core';
import { Master } from '../../admin/master/master';
import { Observable } from 'rxjs';
import { MasterModelService } from '../../admin/master/master-model.service';
import { Category } from '../../admin/master/categories/api/category';
import { Stock } from '../../stock/api/stock';
import { StockModelService } from '../../stock/stock-model.service';

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.scss']
})
export class SalePointComponent implements OnInit {
  master$: Observable<Master>;
  categories: Category[] = [];
  currently_stocks: Stock[] = [];
  stocks$: Observable<Stock[]>;
  constructor(private modelService:StockModelService,private msterModelService:MasterModelService) { }
  category_selected:Category;
  is_categry_clicked=false;
  ngOnInit() {
    this.master$ = this.msterModelService.master$;

    this.master$.subscribe(res=>{
      if(res.categories.length  > 0){
        this.categories=res.categories;
      }
  });

  this.stocks$ = this.modelService.stocks$;

  }


   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color=='#ffffff' || color == '#303f9f'?this.getRandomColor():color;
  }
  //[style.color]="'#ffff'" [style.background-color]="getRandomColor()"
  categoriesClicked(category){
    this.category_selected=category;
    this.is_categry_clicked=true;
if(this.is_categry_clicked){
  this.stocks$.subscribe(res=>{
    if(res['available']){
      this.currently_stocks=res['available'].filter(stock=>stock['category']['id']===this.category_selected.category_id);
    }

  });
}

  }
}
