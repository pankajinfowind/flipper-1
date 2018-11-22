import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, DoCheck } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCategoryService } from './api/api.service';
import { finalize, isEmpty } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Category } from './api/category';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../state/master-state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [AsyncPipe]
})
export class CategoriesComponent implements   OnInit,DoCheck {


  public loading = new BehaviorSubject(false);
  constructor(protected pipeAsync: AsyncPipe,private api:ApiCategoryService,private ref: ChangeDetectorRef) { }
  data: Category[] = [];
  displayedColumns: string[] = ['category_id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Category;
  @Select(MasterState.categories) categories$: Observable<Category[]>;
  ngOnInit() {

    // this.category();
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  //  this.checkIncomingData();
  }
  ngDoCheck(): void {
   // console.log(this.categories);
  //  throw new Error("Method not implemented.");
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // get categories() {
  //   this._categories = this.pipeAsync.transform(this.entries$);
  //   if (this._categories.length > 0) {
  //     return this._categories;
  //   }
  //   return null;
  // }
  // category(){

  //   this.entries$.subscribe(
  //       res => {
  //         console.log(res);
  //       },
  //       _error => {
  //       console.error(_error);
  //       }
  //     );
  //   }
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
