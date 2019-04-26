import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer: ElementRef;
  constructor() {}


  ngOnInit() {

  }



}
