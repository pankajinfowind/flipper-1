import { Component, OnInit, ViewChild } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StockExpired } from '../expired-stock/api/expired-stock';

@Component({
  selector: 'app-diplay-expired-stock',
  templateUrl: './diplay-expired-stock.component.html',
  styleUrls: ['./diplay-expired-stock.component.scss']
})
export class DiplayExpiredStockComponent implements OnInit {
//entries
public loading = new BehaviorSubject(false);
  constructor() { }
  displayedColumns: string[] = [
    "sku",
    "batch_no",
    "stock",
    "in_qty",
    "out_qty",
    "total_qty",
    "expired_date",
    "manufacture_date"
  ];
  dataSource = new MatTableDataSource<StockExpired>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
