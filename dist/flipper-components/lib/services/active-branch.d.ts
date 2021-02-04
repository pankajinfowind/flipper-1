import { PouchDBService } from './pouchdb.service';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { ActiveBusiness } from './active-business';
import { Branch } from '../entries';
export declare class ActiveBranch {
    private eventBus;
    private database;
    private currentBusiness;
    currentBranch: Branch;
    constructor(eventBus: FlipperEventBusService, database: PouchDBService, currentBusiness: ActiveBusiness);
    get<K extends keyof Branch>(prop: K): Branch[K];
    set(key: string, value: any): void;
    branch(table?: string): Promise<void>;
}
//# sourceMappingURL=active-branch.d.ts.map