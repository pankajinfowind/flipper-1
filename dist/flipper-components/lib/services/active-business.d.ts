import { ActiveUser } from './active-user';
import { PouchDBService } from './pouchdb.service';
import { Business } from '../entries';
import { FlipperEventBusService } from '@enexus/flipper-event';
export declare class ActiveBusiness {
    private eventBus;
    private database;
    private currentUser;
    currentBusiness: Business;
    constructor(eventBus: FlipperEventBusService, database: PouchDBService, currentUser: ActiveUser);
    get<K extends keyof Business>(prop: K): Business[K];
    set(key: string, value: any): void;
    business(table?: string): Promise<void>;
}
//# sourceMappingURL=active-business.d.ts.map