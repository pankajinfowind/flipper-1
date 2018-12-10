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
  /**
     * Controls left column visibility.
     */
    public leftColumnIsHidden = false;
    isMobile=false;
    pos$: Observable<Pos>;
  constructor(private posModelService:PosModelService,public setting:Settings,private changeDetectionRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.changeDetectionRef.detectChanges();
  }
  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
  }
}
