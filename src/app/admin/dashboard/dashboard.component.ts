import { Component, OnInit } from "@angular/core";
import { GlobalVariables } from "../../common/core/global-variables";

// import { ElectronService } from "ngx-electron";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit{
  ipcRenderer: any;
  constructor(private route: ActivatedRoute,
    public v: GlobalVariables,
    // private _electronService: ElectronService
  ) {
    if (this.isElectron()) {
      // this.ipcRenderer = this._electronService.ipcRenderer;
      this.ipcRenderer.send("version-ping", "ping");
      this.ipcRenderer.on("version-pong", (event, version) => {
        this.v.webTitle("Flipper" + "v" + version);
      });
    } else {
      this.v.webTitle("Flipper");
    }
  }
  ngOnInit() {
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  };
}
