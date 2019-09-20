import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrentUser } from '../../common/auth/current-user';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { OrderItems } from '../../pos/cart/order_items';
import { GlobalVariables } from '../../common/core/global-variables';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { AppHttpClient } from '../../common/core/http/app-http-client.service';
import { AppConfig } from '../../../environments/environment';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent implements OnInit {

  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<OrderItems>;
  public loading = new BehaviorSubject(false);

  dataForm: FormGroup;
  constructor( protected http: AppHttpClient,public currentUser: CurrentUser,public v: GlobalVariables,public paginator: UrlAwarePaginator) {

  }

  ngOnInit() {
    this.v.webTitle('View Sales Reports');

    this.dataForm = new FormGroup({
      from: new FormControl(''),
      to:new FormControl('')
    });

    this.dataSource = new PaginatedDataTableSource<OrderItems>({
      uri: "sales-rpts",
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
    return this.v.downloadFile(AppConfig.url+"/secure/sales-rpts?export=true&branch_id="+parseInt(localStorage.getItem('active_branch'))+"&from="+this.dataForm.value.from+"&to="+this.dataForm.value.to);
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
