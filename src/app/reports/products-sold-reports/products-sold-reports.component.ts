import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrentUser } from '../../common/auth/current-user';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariables } from '../../common/core/global-variables';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';
import { AppConfig } from '../../../environments/environment';

export class ToSoldItem {
  sku?:string;
  item?:string;
  items?:number;
  category?:any;
  created_at?:any;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
@Component({
  selector: 'app-products-sold-reports',
  templateUrl: './products-sold-reports.component.html',
  styleUrls: ['./products-sold-reports.component.scss']
})
export class ProductsSoldReportsComponent implements OnInit {

  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<ToSoldItem>;
  public loading = new BehaviorSubject(false);

  dataForm: FormGroup;
  constructor( protected http: AppHttpClient,public currentUser: CurrentUser,public v: GlobalVariables,public paginator: UrlAwarePaginator) {

  }

  ngOnInit() {
    this.v.webTitle('View Top Product Sold Reports');

    this.dataForm = new FormGroup({
      from: new FormControl(''),
      to:new FormControl('')
    });

    this.dataSource = new PaginatedDataTableSource<ToSoldItem>({
      uri: "top-selling-items-rpts",
      dataPaginator: this.paginator,
      matSort: this.matSort,
      staticParams:{branch_id:parseInt(localStorage.getItem('active_branch'))}
  });
  }
  get from() {
    return this.dataForm.get("from");
  }
  get to() {
    return this.dataForm.get("to");
  }
  export(){
    return this.v.downloadFile(AppConfig.url+"/secure/top-selling-items-rpts?export=true&branch_id="+parseInt(localStorage.getItem('active_branch'))+"&from="+this.dataForm.value.from+"&to="+this.dataForm.value.to);
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
  orderParams(){
   return this.dataSource.setParams(this.dataForm.value);
  }
 
}