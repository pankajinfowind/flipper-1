import { Component, OnInit } from "@angular/core";
import { GlobalVariables } from "../../common/core/global-variables";
import { ipcRenderer } from "electron";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  ipcRenderer: typeof ipcRenderer;
  constructor(public v: GlobalVariables) {
    if (this.isElectron()) {
      this.ipcRenderer = window.require("electron").ipcRenderer;
      ipcRenderer.send("version-ping", "ping");
      ipcRenderer.on("version-pong", (event, version) => {
        this.v.webTitle("Flipper" + "v" + version);
      });
    } else {
      this.v.webTitle("Flipper");
    }
  }

  ngOnInit() {}
  isElectron = () => {
    return window && window.process && window.process.type;
  };
}
