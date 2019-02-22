import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pos } from '../pos';
import { PosModelService } from '../pos-model.service';

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"]
})
export class PosComponent implements OnInit {
  public appearance;
  /**
     * Controls left column visibility.
     */
  public leftColumnIsHidden = false;
  isMobile = false;
  pos$: Observable<Pos>;
  constructor(private posModelService: PosModelService) { }


  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
  }
  listenOnCustomer(e: any) {
    // console.log(e);
  }
}
