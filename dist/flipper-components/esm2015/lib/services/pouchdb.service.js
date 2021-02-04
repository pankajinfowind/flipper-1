import { __awaiter } from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb/dist/pouchdb';
import debugPouch from 'pouchdb-debug';
import { v1 as uuidv1 } from 'uuid';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { flipperUrl } from '../constants';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@enexus/flipper-event";
class Response {
}
export class PouchDBService {
    constructor(http, eventBus) {
        this.http = http;
        this.eventBus = eventBus;
        this.isInstantiated = false;
        this.listener = new EventEmitter();
        this.listenerLogin = new EventEmitter();
        // PouchDB.plugin(PouchFind);
        PouchDB.plugin(require('pouchdb-find').default);
        this.connect('main');
        debugPouch(PouchDB);
        this.sync([localStorage.getItem('userId')]); //we keep the current logged userId in local storage for quick access
    }
    activeUser(table = 'users') {
        return this.database
            .createIndex({
            index: { fields: ['table', 'active'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                },
            });
        });
    }
    query(fields = [], selector = {}) {
        return this.database
            .createIndex({
            index: { fields: fields },
        })
            .then(() => {
            return this.database.find({
                selector: selector,
            });
        });
    }
    fastQuery(fields = [], selector = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create the Index
                var result = yield this.database.createIndex({
                    index: { fields: fields },
                });
                // Query the Index using find().
                result = yield this.database.find({
                    selector: selector,
                });
                // Found docs are in result.docs
                return yield result.docs;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    callbackQuery(fields = [], selector = {}, callback) {
        return this.database.find({
            selector: selector,
            fields: fields,
        }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            // handle result
            return callback(result);
        });
    }
    activeBusiness(userId, table = 'businesses') {
        // comment
        return this.database
            .createIndex({
            index: { fields: ['table', 'active', 'userId'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                    userId: { $eq: userId },
                },
            });
        });
    }
    hasDraftProduct(businessId, table = 'products') {
        // comment
        return this.database
            .createIndex({
            index: { fields: ['table', 'isDraft', 'businessId'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    isDraft: { $eq: true },
                    businessId: { $eq: businessId },
                },
            });
        });
    }
    currentBusiness() {
        return this.activeUser().then((user) => {
            if (user && user.docs.length > 0) {
                return this.activeBusiness(user.docs[0].id, 'businesses').then((business) => {
                    if (business && business.docs.length > 0) {
                        return business.docs[0];
                    }
                });
            }
        });
    }
    currentTax() {
        // TODO: migrate this
        return this.activeUser().then((user) => {
            if (user && user.docs.length > 0) {
                return this.activeBusiness(user.docs[0].id, 'businesses').then((business) => {
                    if (business && business.docs.length > 0) {
                        return this.database
                            .query(['table', 'businessId', 'isDefault'], {
                            table: { $eq: 'taxes' },
                            businessId: { $eq: business.docs[0].id },
                            isDefault: { $eq: true },
                        })
                            .then((res) => {
                            if (res.docs && res.docs.length > 0) {
                                return res.docs[0];
                            }
                            else {
                                return [];
                            }
                        });
                    }
                    else {
                        return null;
                    }
                });
            }
        });
    }
    listBusinessBranches() {
        return __awaiter(this, void 0, void 0, function* () {
            // I put any on the first promise as my intention is to return a list of branches not businesses
            return yield this.http
                .get(flipperUrl + '/api/business')
                .toPromise()
                .then((business) => __awaiter(this, void 0, void 0, function* () {
                if (business) {
                    return yield this.http
                        .get(flipperUrl + '/api/branches/' + business.id)
                        .toPromise()
                        .then(branches => {
                        return branches;
                    });
                }
            }));
            // return this.currentBusiness().then((business: { id: any }) => {
            //   if (business) {
            //     return this.query(['table', 'businessId'], {
            //       table: { $eq: 'branches' },
            //       businessId: { $eq: business.id },
            //     }).then((res: { docs: string | any[] }) => {
            //       if (res.docs && res.docs.length > 0) {
            //         return res.docs
            //       } else {
            //         return []
            //       }
            //     })
            //   } else {
            //     return []
            //   }
            // })
        });
    }
    listBusinessTaxes() {
        return this.currentBusiness().then((business) => {
            if (business) {
                return this.query(['table', 'businessId'], {
                    table: { $eq: 'taxes' },
                    businessId: { $eq: business.id },
                }).then((res) => {
                    if (res.docs && res.docs.length > 0) {
                        return res.docs;
                    }
                    else {
                        return [];
                    }
                });
            }
            else {
                return [];
            }
        });
    }
    listBusinessTaxes2() {
        return this.currentBusiness().then((business) => {
            if (business) {
                return this.callbackQuery(['table', 'businessId'], {
                    table: { $eq: 'taxes' },
                    businessId: { $eq: business.id },
                }, res => {
                    if (res.docs && res.docs.length > 0) {
                        return res.docs;
                    }
                    else {
                        return [];
                    }
                });
            }
            else {
                return [];
            }
        });
    }
    activeBranch(businessId, table = 'branches') {
        return this.database
            .createIndex({
            index: { fields: ['tables', 'active', 'businessId'] },
        })
            .then(() => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                    businessId: { $eq: businessId },
                },
            });
        });
    }
    connect(dbName, filter = null) {
        if (!this.isInstantiated) {
            this.database = new PouchDB('main');
            console.log('did couchbase connected?');
            if (filter != null) {
                this.database.changes({
                    filter: (doc) => {
                        //make sure we filter only to listen on our document of intrest.
                        // TODO: see if we need this as not filter can be part of the sync function
                        return doc.channels[0] === filter;
                    },
                });
            }
            this.isInstantiated = true;
        }
    }
    fetch() {
        return this.database.allDocs({ include_docs: true });
    }
    get(id) {
        // enable allowing conflicting document.
        return this.database.get(id, { conflicts: false });
        // return  this.database.createIndex({
        //     index: {fields: ['id']}
        //   }).then(result => {
        //       return this.database.find({
        //         selector: {
        //           id: {$eq:id}
        //         }
        //       });
        //   })
    }
    remove(document) {
        try {
            return this.database.remove(document);
        }
        catch (e) {
            console.log('did not removed', e);
        }
    }
    find(id) {
        return this.get(id).then((result) => {
            return result;
        }, (error) => {
            if (error.status === '404') {
                throw new Error(`ERROR:${error}`);
            }
            else {
                return new Promise((_resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    getResponse(result, isArray) {
        if (!Array.isArray(result) && isArray) {
            return [result];
        }
        if (Array.isArray(result) && !isArray) {
            return result[0];
        }
        return result;
    }
    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    uid() {
        return uuidv1();
    }
    put(id, document) {
        document._id = id;
        document.uid = this.uid();
        document.channel = localStorage.getItem('userId');
        document.channels = [localStorage.getItem('userId')];
        return this.get(id).then((result) => {
            document._rev = result._rev;
            console.log('updated doc', document);
            return this.database.put(document);
        }, (error) => {
            console.log('error on update', error);
            if (error.status === '404' || error.status === 404) {
                return this.database.put(document);
            }
            else {
                return new Promise((_resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    sync(channels) {
        //NOTE: our main = bucket and is constant to all users. //do not use sessionId on pouchDB we don't use it on backend i.e on the server
        // return PouchDB.sync('main', 'url', {
        //   password: 'singlworld',
        //   user: 'admin',
        //   push: true,
        //   live: true,
        //   retry: true,
        //   continous: true,
        //   filter: "sync_gateway/bychannel",
        //   query_params: { "channels": ['43'] },
        // })
    }
    getChangeListener() {
        return this.listener;
    }
    getChangeListenerLogin() {
        return this.listenerLogin;
    }
    unique(a, key = 'name') {
        return a.length > 0 ? this.removeDuplicates(a, key) : [];
    }
    contains(array, obj, key) {
        for (const newObj of array) {
            if (this.isEqual(newObj, obj, key)) {
                return true;
            }
        }
        return false;
    }
    // comparator
    isEqual(obj1, obj2, key) {
        if (obj1[key] === obj2[key]) {
            return true;
        }
        return false;
    }
    removeDuplicates(ary, key) {
        const arr = [];
        return ary.filter((x) => {
            return !this.contains(arr, x, key) && arr.push(x);
        });
    }
}
PouchDBService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PouchDBService_Factory() { return new PouchDBService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.FlipperEventBusService)); }, token: PouchDBService, providedIn: "root" });
PouchDBService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
PouchDBService.ctorParameters = () => [
    { type: HttpClient },
    { type: FlipperEventBusService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG91Y2hkYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1jb21wb25lbnRzL3NyYy9saWIvc2VydmljZXMvcG91Y2hkYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUN4RCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQTtBQUMxQyxPQUFPLFVBQVUsTUFBTSxlQUFlLENBQUE7QUFFdEMsT0FBTyxFQUFFLEVBQUUsSUFBSSxNQUFNLEVBQUUsTUFBTSxNQUFNLENBQUE7QUFDbkMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUV6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUE7Ozs7QUFHakQsTUFBTSxRQUFRO0NBR2I7QUFTRCxNQUFNLE9BQU8sY0FBYztJQU16QixZQUEyQixJQUFnQixFQUFVLFFBQWdDO1FBQTFELFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUw3RSxtQkFBYyxHQUFZLEtBQUssQ0FBQTtRQUVoQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUE7UUFDaEQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUcxRCw2QkFBNkI7UUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNwQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFB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QUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWlCLEVBQUUsR0FBUSxFQUFFLEdBQVc7UUFDL0MsS0FBSyxNQUFNLE1BQU0sSUFBSSxLQUFLLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFBO2FBQ1o7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUNELGFBQWE7SUFDYixPQUFPLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxHQUFXO1FBQ3ZDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQTtTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsR0FBZSxFQUFFLEdBQVc7UUFDM0MsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7OztZQXRZRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWRRLFVBQVU7WUFIVixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgUG91Y2hEQiBmcm9tICdwb3VjaGRiL2Rpc3QvcG91Y2hkYidcclxuaW1wb3J0IGRlYnVnUG91Y2ggZnJvbSAncG91Y2hkYi1kZWJ1ZydcclxuXHJcbmltcG9ydCB7IHYxIGFzIHV1aWR2MSB9IGZyb20gJ3V1aWQnXHJcbmltcG9ydCB7IEZsaXBwZXJFdmVudEJ1c1NlcnZpY2UgfSBmcm9tICdAZW5leHVzL2ZsaXBwZXItZXZlbnQnXHJcbmltcG9ydCB7IGZsaXBwZXJVcmwgfSBmcm9tICcuLi9jb25zdGFudHMnXHJcbmltcG9ydCB7IEJ1c2luZXNzIH0gZnJvbSAnLi4vZW50cmllcy9idXNpbmVzcydcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJ1xyXG5pbXBvcnQgeyBCcmFuY2ggfSBmcm9tICcuLi9lbnRyaWVzL2JyYW5jaCdcclxuXHJcbmNsYXNzIFJlc3BvbnNlIHtcclxuICByZXM6IGFueVxyXG4gIGRvY3M6IGFueVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSGFuZGxlciB7XHJcbiAgKHJlc3VsdDogUmVzcG9uc2UpOiB2b2lkXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3VjaERCU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBpc0luc3RhbnRpYXRlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgcHJpdmF0ZSBkYXRhYmFzZTogYW55XHJcbiAgcHVibGljIGxpc3RlbmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG4gIHB1YmxpYyBsaXN0ZW5lckxvZ2luOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50QnVzOiBGbGlwcGVyRXZlbnRCdXNTZXJ2aWNlKSB7XHJcbiAgICAvLyBQb3VjaERCLnBsdWdpbihQb3VjaEZpbmQpO1xyXG4gICAgUG91Y2hEQi5wbHVnaW4ocmVxdWlyZSgncG91Y2hkYi1maW5kJykuZGVmYXVsdClcclxuICAgIHRoaXMuY29ubmVjdCgnbWFpbicpXHJcbiAgICBkZWJ1Z1BvdWNoKFBvdWNoREIpXHJcbiAgICB0aGlzLnN5bmMoW2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKV0pIC8vd2Uga2VlcCB0aGUgY3VycmVudCBsb2dnZWQgdXNlcklkIGluIGxvY2FsIHN0b3JhZ2UgZm9yIHF1aWNrIGFjY2Vzc1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFjdGl2ZVVzZXIodGFibGUgPSAndXNlcnMnKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZVxyXG4gICAgICAuY3JlYXRlSW5kZXgoe1xyXG4gICAgICAgIGluZGV4OiB7IGZpZWxkczogWyd0YWJsZScsICdhY3RpdmUnXSB9LFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZmluZCh7XHJcbiAgICAgICAgICBzZWxlY3Rvcjoge1xyXG4gICAgICAgICAgICB0YWJsZTogeyAkZXE6IHRhYmxlIH0sXHJcbiAgICAgICAgICAgIGFjdGl2ZTogeyAkZXE6IHRydWUgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBxdWVyeShmaWVsZHMgPSBbXSwgc2VsZWN0b3IgPSB7fSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2VcclxuICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICBpbmRleDogeyBmaWVsZHM6IGZpZWxkcyB9LFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuZmluZCh7XHJcbiAgICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcbiAgcHVibGljIGFzeW5jIGZhc3RRdWVyeShmaWVsZHMgPSBbXSwgc2VsZWN0b3IgPSB7fSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8gQ3JlYXRlIHRoZSBJbmRleFxyXG4gICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYXRhYmFzZS5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgaW5kZXg6IHsgZmllbGRzOiBmaWVsZHMgfSxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIFF1ZXJ5IHRoZSBJbmRleCB1c2luZyBmaW5kKCkuXHJcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuZGF0YWJhc2UuZmluZCh7XHJcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gRm91bmQgZG9jcyBhcmUgaW4gcmVzdWx0LmRvY3NcclxuICAgICAgcmV0dXJuIGF3YWl0IHJlc3VsdC5kb2NzXHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNhbGxiYWNrUXVlcnkoZmllbGRzID0gW10sIHNlbGVjdG9yID0ge30sIGNhbGxiYWNrOiBIYW5kbGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5maW5kKFxyXG4gICAgICB7XHJcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxyXG4gICAgICAgIGZpZWxkczogZmllbGRzLFxyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAoZXJyOiBhbnksIHJlc3VsdDogUmVzcG9uc2UpIHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBoYW5kbGUgcmVzdWx0XHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdClcclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFjdGl2ZUJ1c2luZXNzKHVzZXJJZDogYW55LCB0YWJsZSA9ICdidXNpbmVzc2VzJykge1xyXG4gICAgLy8gY29tbWVudFxyXG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2VcclxuICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICBpbmRleDogeyBmaWVsZHM6IFsndGFibGUnLCAnYWN0aXZlJywgJ3VzZXJJZCddIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5maW5kKHtcclxuICAgICAgICAgIHNlbGVjdG9yOiB7XHJcbiAgICAgICAgICAgIHRhYmxlOiB7ICRlcTogdGFibGUgfSxcclxuICAgICAgICAgICAgYWN0aXZlOiB7ICRlcTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICB1c2VySWQ6IHsgJGVxOiB1c2VySWQgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNEcmFmdFByb2R1Y3QoYnVzaW5lc3NJZDogYW55LCB0YWJsZSA9ICdwcm9kdWN0cycpIHtcclxuICAgIC8vIGNvbW1lbnRcclxuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlXHJcbiAgICAgIC5jcmVhdGVJbmRleCh7XHJcbiAgICAgICAgaW5kZXg6IHsgZmllbGRzOiBbJ3RhYmxlJywgJ2lzRHJhZnQnLCAnYnVzaW5lc3NJZCddIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5maW5kKHtcclxuICAgICAgICAgIHNlbGVjdG9yOiB7XHJcbiAgICAgICAgICAgIHRhYmxlOiB7ICRlcTogdGFibGUgfSxcclxuICAgICAgICAgICAgaXNEcmFmdDogeyAkZXE6IHRydWUgfSxcclxuICAgICAgICAgICAgYnVzaW5lc3NJZDogeyAkZXE6IGJ1c2luZXNzSWQgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcbiAgcHVibGljIGN1cnJlbnRCdXNpbmVzcygpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGl2ZVVzZXIoKS50aGVuKCh1c2VyOiB7IGRvY3M6IHN0cmluZyB8IGFueVtdIH0pID0+IHtcclxuICAgICAgaWYgKHVzZXIgJiYgdXNlci5kb2NzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVCdXNpbmVzcyh1c2VyLmRvY3NbMF0uaWQsICdidXNpbmVzc2VzJykudGhlbigoYnVzaW5lc3M6IHsgZG9jczogc3RyaW5nIHwgYW55W10gfSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGJ1c2luZXNzICYmIGJ1c2luZXNzLmRvY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYnVzaW5lc3MuZG9jc1swXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3VycmVudFRheCgpIHtcclxuICAgIC8vIFRPRE86IG1pZ3JhdGUgdGhpc1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlVXNlcigpLnRoZW4oKHVzZXI6IHsgZG9jczogc3RyaW5nIHwgYW55W10gfSkgPT4ge1xyXG4gICAgICBpZiAodXNlciAmJiB1c2VyLmRvY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUJ1c2luZXNzKHVzZXIuZG9jc1swXS5pZCwgJ2J1c2luZXNzZXMnKS50aGVuKChidXNpbmVzczogeyBkb2NzOiBzdHJpbmcgfCBhbnlbXSB9KSA9PiB7XHJcbiAgICAgICAgICBpZiAoYnVzaW5lc3MgJiYgYnVzaW5lc3MuZG9jcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlXHJcbiAgICAgICAgICAgICAgLnF1ZXJ5KFsndGFibGUnLCAnYnVzaW5lc3NJZCcsICdpc0RlZmF1bHQnXSwge1xyXG4gICAgICAgICAgICAgICAgdGFibGU6IHsgJGVxOiAndGF4ZXMnIH0sXHJcbiAgICAgICAgICAgICAgICBidXNpbmVzc0lkOiB7ICRlcTogYnVzaW5lc3MuZG9jc1swXS5pZCB9LFxyXG4gICAgICAgICAgICAgICAgaXNEZWZhdWx0OiB7ICRlcTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oKHJlczogeyBkb2NzOiBzdHJpbmcgfCBhbnlbXSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmRvY3MgJiYgcmVzLmRvY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRvY3NbMF1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgbGlzdEJ1c2luZXNzQnJhbmNoZXMoKSB7XHJcbiAgICAvLyBJIHB1dCBhbnkgb24gdGhlIGZpcnN0IHByb21pc2UgYXMgbXkgaW50ZW50aW9uIGlzIHRvIHJldHVybiBhIGxpc3Qgb2YgYnJhbmNoZXMgbm90IGJ1c2luZXNzZXNcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHBcclxuICAgICAgLmdldDxhbnk+KGZsaXBwZXJVcmwgKyAnL2FwaS9idXNpbmVzcycpXHJcbiAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAudGhlbihhc3luYyBidXNpbmVzcyA9PiB7XHJcbiAgICAgICAgaWYgKGJ1c2luZXNzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5nZXQ8W0JyYW5jaF0+KGZsaXBwZXJVcmwgKyAnL2FwaS9icmFuY2hlcy8nICsgYnVzaW5lc3MuaWQpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKVxyXG4gICAgICAgICAgICAudGhlbihicmFuY2hlcyA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGJyYW5jaGVzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgLy8gcmV0dXJuIHRoaXMuY3VycmVudEJ1c2luZXNzKCkudGhlbigoYnVzaW5lc3M6IHsgaWQ6IGFueSB9KSA9PiB7XHJcbiAgICAvLyAgIGlmIChidXNpbmVzcykge1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLnF1ZXJ5KFsndGFibGUnLCAnYnVzaW5lc3NJZCddLCB7XHJcbiAgICAvLyAgICAgICB0YWJsZTogeyAkZXE6ICdicmFuY2hlcycgfSxcclxuICAgIC8vICAgICAgIGJ1c2luZXNzSWQ6IHsgJGVxOiBidXNpbmVzcy5pZCB9LFxyXG4gICAgLy8gICAgIH0pLnRoZW4oKHJlczogeyBkb2NzOiBzdHJpbmcgfCBhbnlbXSB9KSA9PiB7XHJcbiAgICAvLyAgICAgICBpZiAocmVzLmRvY3MgJiYgcmVzLmRvY3MubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gcmVzLmRvY3NcclxuICAgIC8vICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBbXVxyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIFtdXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbGlzdEJ1c2luZXNzVGF4ZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50QnVzaW5lc3MoKS50aGVuKChidXNpbmVzczogeyBpZDogYW55IH0pID0+IHtcclxuICAgICAgaWYgKGJ1c2luZXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkoWyd0YWJsZScsICdidXNpbmVzc0lkJ10sIHtcclxuICAgICAgICAgIHRhYmxlOiB7ICRlcTogJ3RheGVzJyB9LFxyXG4gICAgICAgICAgYnVzaW5lc3NJZDogeyAkZXE6IGJ1c2luZXNzLmlkIH0sXHJcbiAgICAgICAgfSkudGhlbigocmVzOiB7IGRvY3M6IHN0cmluZyB8IGFueVtdIH0pID0+IHtcclxuICAgICAgICAgIGlmIChyZXMuZG9jcyAmJiByZXMuZG9jcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuZG9jc1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW11cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsaXN0QnVzaW5lc3NUYXhlczIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50QnVzaW5lc3MoKS50aGVuKChidXNpbmVzczogeyBpZDogYW55IH0pID0+IHtcclxuICAgICAgaWYgKGJ1c2luZXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsbGJhY2tRdWVyeShcclxuICAgICAgICAgIFsndGFibGUnLCAnYnVzaW5lc3NJZCddLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0YWJsZTogeyAkZXE6ICd0YXhlcycgfSxcclxuICAgICAgICAgICAgYnVzaW5lc3NJZDogeyAkZXE6IGJ1c2luZXNzLmlkIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVzID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5kb2NzICYmIHJlcy5kb2NzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVzLmRvY3NcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW11cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgcHVibGljIGFjdGl2ZUJyYW5jaChidXNpbmVzc0lkOiBzdHJpbmcsIHRhYmxlID0gJ2JyYW5jaGVzJykge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2VcclxuICAgICAgLmNyZWF0ZUluZGV4KHtcclxuICAgICAgICBpbmRleDogeyBmaWVsZHM6IFsndGFibGVzJywgJ2FjdGl2ZScsICdidXNpbmVzc0lkJ10gfSxcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLmZpbmQoe1xyXG4gICAgICAgICAgc2VsZWN0b3I6IHtcclxuICAgICAgICAgICAgdGFibGU6IHsgJGVxOiB0YWJsZSB9LFxyXG4gICAgICAgICAgICBhY3RpdmU6IHsgJGVxOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGJ1c2luZXNzSWQ6IHsgJGVxOiBidXNpbmVzc0lkIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29ubmVjdChkYk5hbWU6IHN0cmluZywgZmlsdGVyOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnN0YW50aWF0ZWQpIHtcclxuICAgICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBQb3VjaERCKCdtYWluJylcclxuICAgICAgY29uc29sZS5sb2coJ2RpZCBjb3VjaGJhc2UgY29ubmVjdGVkPycpXHJcbiAgICAgIGlmIChmaWx0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuY2hhbmdlcyh7XHJcbiAgICAgICAgICBmaWx0ZXI6IChkb2M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvL21ha2Ugc3VyZSB3ZSBmaWx0ZXIgb25seSB0byBsaXN0ZW4gb24gb3VyIGRvY3VtZW50IG9mIGludHJlc3QuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHNlZSBpZiB3ZSBuZWVkIHRoaXMgYXMgbm90IGZpbHRlciBjYW4gYmUgcGFydCBvZiB0aGUgc3luYyBmdW5jdGlvblxyXG4gICAgICAgICAgICByZXR1cm4gZG9jLmNoYW5uZWxzWzBdID09PSBmaWx0ZXJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzSW5zdGFudGlhdGVkID0gdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZldGNoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2UuYWxsRG9jcyh7IGluY2x1ZGVfZG9jczogdHJ1ZSB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldChpZDogc3RyaW5nKSB7XHJcbiAgICAvLyBlbmFibGUgYWxsb3dpbmcgY29uZmxpY3RpbmcgZG9jdW1lbnQuXHJcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5nZXQoaWQsIHsgY29uZmxpY3RzOiBmYWxzZSB9KVxyXG4gICAgLy8gcmV0dXJuICB0aGlzLmRhdGFiYXNlLmNyZWF0ZUluZGV4KHtcclxuICAgIC8vICAgICBpbmRleDoge2ZpZWxkczogWydpZCddfVxyXG4gICAgLy8gICB9KS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAvLyAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5maW5kKHtcclxuICAgIC8vICAgICAgICAgc2VsZWN0b3I6IHtcclxuICAgIC8vICAgICAgICAgICBpZDogeyRlcTppZH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgfSk7XHJcbiAgICAvLyAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlKGRvY3VtZW50OiBhbnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLnJlbW92ZShkb2N1bWVudClcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2RpZCBub3QgcmVtb3ZlZCcsIGUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmluZChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXQoaWQpLnRoZW4oXHJcbiAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yOiB7IHN0YXR1czogc3RyaW5nIH0pID0+IHtcclxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSAnNDA0Jykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFUlJPUjoke2Vycm9yfWApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgZ2V0UmVzcG9uc2UocmVzdWx0OiBhbnlbXSwgaXNBcnJheTogYW55KSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzdWx0KSAmJiBpc0FycmF5KSB7XHJcbiAgICAgIHJldHVybiBbcmVzdWx0XVxyXG4gICAgfVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSAmJiAhaXNBcnJheSkge1xyXG4gICAgICByZXR1cm4gcmVzdWx0WzBdXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfVxyXG5cclxuICBtYWtlaWQobGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIGxldCByZXN1bHQgPSAnJ1xyXG4gICAgY29uc3QgY2hhcmFjdGVycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSdcclxuICAgIGNvbnN0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbiAgfVxyXG5cclxuICB1aWQoKSB7XHJcbiAgICByZXR1cm4gdXVpZHYxKClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwdXQoaWQ6IHN0cmluZywgZG9jdW1lbnQ6IGFueSkge1xyXG4gICAgZG9jdW1lbnQuX2lkID0gaWRcclxuICAgIGRvY3VtZW50LnVpZCA9IHRoaXMudWlkKClcclxuICAgIGRvY3VtZW50LmNoYW5uZWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcklkJylcclxuICAgIGRvY3VtZW50LmNoYW5uZWxzID0gW2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySWQnKV1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXQoaWQpLnRoZW4oXHJcbiAgICAgIChyZXN1bHQ6IHsgX3JldjogYW55IH0pID0+IHtcclxuICAgICAgICBkb2N1bWVudC5fcmV2ID0gcmVzdWx0Ll9yZXZcclxuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlZCBkb2MnLCBkb2N1bWVudClcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5wdXQoZG9jdW1lbnQpXHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcjogeyBzdGF0dXM6IHN0cmluZyB8IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIG9uIHVwZGF0ZScsIGVycm9yKVxyXG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09ICc0MDQnIHx8IGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5wdXQoZG9jdW1lbnQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKVxyXG4gIH1cclxuICBwdWJsaWMgc3luYyhjaGFubmVsczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgLy9OT1RFOiBvdXIgbWFpbiA9IGJ1Y2tldCBhbmQgaXMgY29uc3RhbnQgdG8gYWxsIHVzZXJzLiAvL2RvIG5vdCB1c2Ugc2Vzc2lvbklkIG9uIHBvdWNoREIgd2UgZG9uJ3QgdXNlIGl0IG9uIGJhY2tlbmQgaS5lIG9uIHRoZSBzZXJ2ZXJcclxuICAgIC8vIHJldHVybiBQb3VjaERCLnN5bmMoJ21haW4nLCAndXJsJywge1xyXG4gICAgLy8gICBwYXNzd29yZDogJ3Npbmdsd29ybGQnLFxyXG4gICAgLy8gICB1c2VyOiAnYWRtaW4nLFxyXG4gICAgLy8gICBwdXNoOiB0cnVlLFxyXG4gICAgLy8gICBsaXZlOiB0cnVlLFxyXG4gICAgLy8gICByZXRyeTogdHJ1ZSxcclxuICAgIC8vICAgY29udGlub3VzOiB0cnVlLFxyXG4gICAgLy8gICBmaWx0ZXI6IFwic3luY19nYXRld2F5L2J5Y2hhbm5lbFwiLFxyXG4gICAgLy8gICBxdWVyeV9wYXJhbXM6IHsgXCJjaGFubmVsc1wiOiBbJzQzJ10gfSxcclxuICAgIC8vIH0pXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRDaGFuZ2VMaXN0ZW5lcigpIHtcclxuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyXHJcbiAgfVxyXG4gIHB1YmxpYyBnZXRDaGFuZ2VMaXN0ZW5lckxvZ2luKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJMb2dpblxyXG4gIH1cclxuICB1bmlxdWUoYTogQXJyYXk8YW55Piwga2V5OiBzdHJpbmcgPSAnbmFtZScpOiBBcnJheTxhbnk+IHtcclxuICAgIHJldHVybiBhLmxlbmd0aCA+IDAgPyB0aGlzLnJlbW92ZUR1cGxpY2F0ZXMoYSwga2V5KSA6IFtdXHJcbiAgfVxyXG4gIGNvbnRhaW5zKGFycmF5OiBBcnJheTxhbnk+LCBvYmo6IGFueSwga2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGZvciAoY29uc3QgbmV3T2JqIG9mIGFycmF5KSB7XHJcbiAgICAgIGlmICh0aGlzLmlzRXF1YWwobmV3T2JqLCBvYmosIGtleSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgLy8gY29tcGFyYXRvclxyXG4gIGlzRXF1YWwob2JqMTogYW55LCBvYmoyOiBhbnksIGtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAob2JqMVtrZXldID09PSBvYmoyW2tleV0pIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuICByZW1vdmVEdXBsaWNhdGVzKGFyeTogQXJyYXk8YW55Piwga2V5OiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGFyciA9IFtdXHJcbiAgICByZXR1cm4gYXJ5LmZpbHRlcigoeDogYW55KSA9PiB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5jb250YWlucyhhcnIsIHgsIGtleSkgJiYgYXJyLnB1c2goeClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbiJdfQ==