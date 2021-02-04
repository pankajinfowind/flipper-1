import { FlipperEventBusService } from '@enexus/flipper-event';
import { PouchDBService } from './pouchdb.service';
import { User } from '../entries';
export declare class ActiveUser {
    private eventBus;
    private database;
    currentUser: User;
    constructor(eventBus: FlipperEventBusService, database: PouchDBService);
    init(): void;
    get<K extends keyof User>(prop: K): User[K];
    set(key: string, value: any): void;
    user(table?: any): Promise<void>;
}
//# sourceMappingURL=active-user.d.ts.map