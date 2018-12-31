
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class YLocalStorage {

  save(key, value: any) {
    return localStorage.setItem(key, value);
  }
  get(value): any {
    return localStorage.getItem(value);
  }
  remove(value): any {
     return  localStorage.removeItem(value);
  }
}
