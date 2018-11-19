import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCategoryService } from './api/api.service';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Category } from './api/category';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../state/master-state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public loading = new BehaviorSubject(false);
  constructor(private api:ApiCategoryService,private ref: ChangeDetectorRef) { }
  data: Category[] = [];
  displayedColumns: string[] = ['category_id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Category;
  @Select(MasterState.categories) entries$: Observable<Category[]>;
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
    this.entries$.pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          console.log(res);
        },
        _error => {
        console.error(_error);
        }
      );
    }
    checkIncomingData(){
      // this.ref.detach();
      // setInterval(() => {
      //   if(this.shared_output){
      //     this.data.push(this.shared_output);
      //     this.shared_output=null;
      //   }
      //   this.ref.detectChanges();
      // }, 1000);

    }
}
