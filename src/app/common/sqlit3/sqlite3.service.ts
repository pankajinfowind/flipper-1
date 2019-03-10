import { Injectable, EventEmitter } from '@angular/core';
import { ElectronService } from "ngx-electron";
import { Customer } from '../../customers/customer';
import { Orders } from '../../orders/orders';




@Injectable({
  providedIn: 'root'
})
export class Sqlite3Service {
  ipcRenderer: any;
  sqlite3Data: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _electronService: ElectronService) {
    //I want to given a type of object I want to return 
    // an observable as normal http call to server
    //seend a ping to electron and get appropriate object
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  };
  getSqliteData(dataType: string) {

    if (this.isElectron()) {
      this.ipcRenderer = this._electronService.ipcRenderer;
      this.ipcRenderer.send("iWantDataWith", dataType);
      return this.ipcRenderer.on("hereIsYourData", (event, users) => {
        this.sqlite3Data.emit(users);
      });
    }
  }
  saveSqliteData(data: Customer | Orders, table: string) {
    let insertableObject = {
      data: data,
      table: table
    }

    if (this.isElectron()) {
      this.ipcRenderer = this._electronService.ipcRenderer;
      this.ipcRenderer.send("iWantToSaveDataOf", insertableObject);
      return this.ipcRenderer.on("hereIsYourData", (event, users) => {
        this.sqlite3Data.emit(users);
      });
    }

  }

}
