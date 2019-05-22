import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomizeInvoice } from '../customize-invoice';
import { CustomizeInvoiceService } from '../customize-invoice.service';

@Component({
  selector: 'app-preview-invoice-customized',
  templateUrl: './preview-invoice-customized.component.html',
  styleUrls: ['./preview-invoice-customized.component.scss']
})
export class PreviewInvoiceCustomizedComponent implements OnInit {
  subscription: Observable<CustomizeInvoice>;
  invoice$: Observable<CustomizeInvoice>;

  constructor(private serviceModel:CustomizeInvoiceService) { }

  ngOnInit() {
    this.subscription = this.invoice$ = this.serviceModel.invoice$;
  }

}
