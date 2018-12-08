import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { Settings } from "../../common/core/config/settings.service";

@Component({
  selector: "app-pos",
  templateUrl: "./pos.component.html",
  styleUrls: ["./pos.component.scss"]
})
export class PosComponent implements OnInit {
  public appearance;
  public leftColumnIsHidden: boolean = false;
  isMobile: boolean;
  constructor(
    public setting: Settings,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isMobile = false; //?
  }

  ngAfterViewInit() {
    this.changeDetectionRef.detectChanges();
  }
  public toggleLeftColumn(is_toggled: boolean) {
    this.leftColumnIsHidden = is_toggled;
  }
}
