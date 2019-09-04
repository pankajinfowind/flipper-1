import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GlobalVariables } from '../../common/core/global-variables';
@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosComponent implements OnInit {
  public appearance;
  /**
     * Controls left column visibility.
     */
  public leftColumnIsHidden = false;
  isMobile = false;
  @ViewChild('scrollContainer', {static:true, read: ElementRef }) scrollContainer: ElementRef;
  constructor(public v: GlobalVariables,) {
    this.v.webTitle("Point Of Sales");
  }


  ngOnInit() {

  }



}
