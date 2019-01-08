import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './report-manager.component.html',
  styleUrls: ['./report-manager.component.scss']
})
export class ReportManagerComponent implements OnInit {

  reportType:string;
    selected:string;
  constructor() { }

  ngOnInit() {
    this.reportType = "sales";
    this.selected = "Sales";
  }
  public setReportType(type: string){
    this.reportType = type;
  }


}
