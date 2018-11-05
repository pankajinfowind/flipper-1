
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class Crypt {
  private encrpty_key = CryptoJS.enc.Utf8.parse('7061737323313231');
  private encrpty_iv = CryptoJS.enc.Utf8.parse('7061737323313231');
  private _encrypted;
  private _decrypted;
  constructor() {}
  set encrypt(value: any) {
    if (value === null || value === undefined) {
      this._encrypted = null;
      return;
    }
    this._encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), this.encrpty_key, {
      keySize: 128 / 8,
      iv: this.encrpty_iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  }
  get encrypt(): any {
    return this._encrypted;
  }

  set decrypt(encrypted: any) {
    if (encrypted === null || encrypted === undefined) {
      this._decrypted = null;
      return;
    }
    this._decrypted = CryptoJS.AES.decrypt(encrypted, this.encrpty_key, {
      keySize: 128 / 8,
      iv: this.encrpty_iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }
  get decrypt(): any {
    return this._decrypted;
  }
}
