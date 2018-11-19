import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiInsuranceService } from './api/ap.service';
import { Insurance } from './api/insurance';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {


  public loading = new BehaviorSubject(false);
  constructor(private api:ApiInsuranceService,private ref: ChangeDetectorRef) { }
  data: Insurance[] = [];
  displayedColumns: string[] = ['logo_url','name', 'discount','country','address', 'action'];
  dataSource = new MatTableDataSource<Insurance>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Insurance;
  ngOnInit() {
    this.insurances();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  //  this.checkIncomingData();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  insurances(){
      this.loading.next(true);
      this.api.getBusinessInsurance().pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          this.data = res['business_insurance'];
          this.dataSource = new MatTableDataSource<Insurance>(this.data);
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
