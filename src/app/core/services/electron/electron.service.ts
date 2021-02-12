import { Injectable, Inject } from '@angular/core'

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell } from 'electron'
import * as childProcess from 'child_process'
import * as fs from 'fs'
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer
  webFrame: typeof webFrame
  remote: typeof remote
  childProcess: typeof childProcess
  shell: typeof shell | undefined = void 0
  fs: typeof fs

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type)
  }

  constructor(@Inject(DOCUMENT) private document: Document) {

    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer
      this.webFrame = window.require('electron').webFrame
      this.remote = window.require('electron').remote
      this.shell = window.require('electron').shell
      this.childProcess = window.require('child_process')
      this.fs = window.require('fs')
    }
  }

  public on(channel: string, listener: any): void {
    if (!this.ipcRenderer) {
      return
    }
    this.ipcRenderer.on(channel, listener)
  }

  public send(channel: string, ...args): void {
    if (!this.ipcRenderer) {
      return
    }
    this.ipcRenderer.send(channel, ...args)
  }

  redirect(url) {
    if (this.isElectron) {
      this.shell.openExternal(url)
    } else {
      this.document.location.href = url
    }
  }
}
