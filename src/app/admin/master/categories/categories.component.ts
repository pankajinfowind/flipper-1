import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiCategoryService } from './api/api.service';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Category } from './api/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public loading = new BehaviorSubject(false);
  constructor(private api:ApiCategoryService,private ref: ChangeDetectorRef) { }
  data: Category[] = [];
  displayedColumns: string[] = ['category_id', 'name'];
  dataSource = new MatTableDataSource<Category>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Category;
  ngOnInit() {
    this.category();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  //  this.checkIncomingData();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  category(){
      this.loading.next(true);
      this.api.get().pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          this.data = res['categories']['data'];
          this.dataSource = new MatTableDataSource<Category>(this.data);
        },
        _error => {
        console.error(_error);
        }
      );
    }
    checkIncomingData(){
      this.ref.detach();
      setInterval(() => {
        if(this.shared_output){
          this.data.push(this.shared_output);
          this.shared_output=null;
        }
        this.ref.detectChanges();
      }, 1000);

    }
}
