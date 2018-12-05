import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { app,ipcRenderer, webFrame, remote, Menu, Tray } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from "path";
@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  app: typeof app;
  fs: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.app = window.require('electron').app;
      // this.serve = this.args.some(val => val === "--serve");
      // if (process.mas) this.app.setName("Flipper");
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;


      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
  //     let iconName;
  // if (this.serve) {
  //   iconName =
  //     process.platform === "win32"
  //       ? "src/assets/tray-icon/windows-icon.png"
  //       : "src/assets/tray-icon/iconTemplate.png";
  // } else {
  //   iconName =
  //     process.platform === "win32"
  //       ? "dist/assets/tray-icon/windows-icon.png"
  //       : "dist/assets/tray-icon/iconTemplate.png";
  // }
      // const iconPath = path.join(__dirname, iconName);
      // let trayIcon = new Tray(iconPath);

      // const trayMenuTemplate = [
      // {
      // label: 'Empty Application',
      // enabled: false
      // },

      // {
      // label: 'Settings',
      // click: function () {
      // console.log("Clicked on settings")
      // }
      // },

      // {
      // label: 'Help',
      // click: function () {
      // console.log("Clicked on Help")
      // }
      // }
      // ];

      // this.trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
      // trayIcon.setContextMenu(this.trayMenu)

    }

  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
