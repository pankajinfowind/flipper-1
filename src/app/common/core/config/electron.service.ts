import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { Titlebar, Color } from 'custom-electron-titlebar';
@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  ipcRenderer: typeof ipcRenderer | undefined = void 0;;
  webFrame: typeof webFrame | undefined = void 0;
  remote: typeof remote | undefined = void 0;
  childProcess: typeof childProcess | undefined = void 0;
  shell: typeof shell | undefined = void 0;
  fs: typeof fs | undefined = void 0;
 
 
  get isElectron() {
    return window && window.process && window.process.type;
  }
   viewTitleBar(){
    if (this.isElectron) {
   // if (window.require) {
      try {
        let title: typeof Titlebar | undefined = void 0;
        title = window.require('custom-electron-titlebar').Titlebar;
        let color: typeof Color | undefined = void 0;
            color = window.require('custom-electron-titlebar').Color;
          return new title({
            backgroundColor: color.WHITE,
            icon: './assets/logo/icon.ico',
            shadow: false
          });
        } catch (e) {
          throw e;
        }
      // } else {
      //   console.warn('Electron\'s IPC was not loaded');
      // }
    }
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
             // if (window.require) {
             try {
              this.ipcRenderer = window.require('electron').ipcRenderer;
              this.webFrame = window.require('electron').webFrame;
              this.remote = window.require('electron').remote;

              this.childProcess = window.require('child_process');
              this.shell = window.require('electron').shell;
              this.fs = window.require('fs');
                } catch (e) {
                  throw e;
                }
              // } else {
              //   console.warn('Electron\'s IPC was not loaded');
              // }
        }
    }

    public on(channel: string, listener: Function): void {
      if (!this.ipcRenderer) {
        return;
      }
      this.ipcRenderer.on(channel, listener);
    }
  
    public send(channel: string, ...args): void {
      if (!this.ipcRenderer) {
        return;
      }
      this.ipcRenderer.send(channel, ...args);
    }
}
