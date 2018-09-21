import { Crypt } from './crypto';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class YLocalStorage {
  constructor(private _crypt: Crypt) {
  }


  save(key, value: any) {
    this._crypt.encrypt = value;
    return localStorage.setItem(key, this._crypt.encrypt);
  }
  get(value): any {
    this._crypt.decrypt = value !== null ? localStorage.getItem(value) : null;
    return this._crypt.decrypt;
  }
  remove(value): any {
     return  localStorage.removeItem(value);
  }
}
