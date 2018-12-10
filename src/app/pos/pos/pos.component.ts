import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Settings } from '../../common/core/config/settings.service';
import { Observable } from 'rxjs';
import { Pos } from '../pos';
import { PosModelService } from '../pos-model.service';

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"]
})
export class PosComponent implements OnInit, AfterViewInit {
  public appearance;
  public leftColumnIsHidden: boolean = false;
  isMobile: boolean;

  constructor(
    public setting: Settings,
    private changeDetectionRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.changeDetectionRef.detectChanges();
  }
  ngOnInit() {
    this.isMobile = false;
  }
  public toggleLeftColumn(is_toggled: boolean) {
    this.leftColumnIsHidden = is_toggled;
  }
}
