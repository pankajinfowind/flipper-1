import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-availabe-stock",
  templateUrl: "./availabe-stock.component.html",
  styleUrls: ["./availabe-stock.component.scss"]
})
export class AvailabeStockComponent implements OnInit {
  url="stock/"+parseInt(localStorage.getItem('active_branch'))+'/available';
  constructor() {}

  ngOnInit() {

  }
}
