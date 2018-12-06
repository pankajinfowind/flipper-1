import { Injectable } from "@angular/core";
import { ipcRenderer, webFrame, remote, app } from "electron";
import * as childProcess from "child_process";
import * as fs from "fs";
@Injectable({
  providedIn: "root"
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  app: typeof app;
  childProcess: typeof childProcess;
  fs: typeof fs;
  version: string = "null";
  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require("electron").ipcRenderer;
      this.webFrame = window.require("electron").webFrame;
      this.remote = window.require("electron").remote;

      this.childProcess = window.require("child_process");
      this.fs = window.require("fs");
      ipcRenderer.send("version", "gmeVersion");
      ipcRenderer.on("version", (event, version) => {
        this.version = version;
      });
    }
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  };
}
