import { EventEmitter } from '@angular/core';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { HttpClient } from '@angular/common/http';
import { Branch } from '../entries/branch';
declare class Response {
    res: any;
    docs: any;
}
interface Handler {
    (result: Response): void;
}
export declare class PouchDBService {
    private http;
    private eventBus;
    private isInstantiated;
    private database;
    listener: EventEmitter<any>;
    listenerLogin: EventEmitter<any>;
    constructor(http: HttpClient, eventBus: FlipperEventBusService);
    activeUser(table?: string): any;
    query(fields?: any[], selector?: {}): any;
    fastQuery(fields?: any[], selector?: {}): Promise<any>;
    callbackQuery(fields: any[], selector: {}, callback: Handler): any;
    activeBusiness(userId: any, table?: string): any;
    hasDraftProduct(businessId: any, table?: string): any;
    currentBusiness(): any;
    currentTax(): any;
    listBusinessBranches(): Promise<[Branch]>;
    listBusinessTaxes(): any;
    listBusinessTaxes2(): any;
    activeBranch(businessId: string, table?: string): any;
    connect(dbName: string, filter?: string): void;
    fetch(): any;
    get(id: string): any;
    remove(document: any): any;
    find(id: string): any;
    getResponse(result: any[], isArray: any): any;
    makeid(length: number): string;
    uid(): any;
    put(id: string, document: any): any;
    sync(channels: Array<string>): void;
    getChangeListener(): EventEmitter<any>;
    getChangeListenerLogin(): EventEmitter<any>;
    unique(a: Array<any>, key?: string): Array<any>;
    contains(array: Array<any>, obj: any, key: string): boolean;
    isEqual(obj1: any, obj2: any, key: string): boolean;
    removeDuplicates(ary: Array<any>, key: string): any[];
}
export {};
//# sourceMappingURL=pouchdb.service.d.ts.map