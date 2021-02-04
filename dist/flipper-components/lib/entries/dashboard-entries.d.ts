export declare class DashBoardEntries {
    id?: number;
    totalStore?: Total;
    grossProfit?: Total;
    netProfit?: Total;
    soldItems?: Items[];
    sellingBranches?: Items[];
    table?: string;
    docId?: string;
    chanels?: any;
    chanel?: any;
    constructor(params?: object);
}
export declare class Total {
    id?: number;
    value?: any;
    percentage?: number;
    since?: string;
    table?: string;
    docId?: string;
    channels: Array<string>;
    channel: any;
    constructor(params?: object);
}
export declare class Items {
    id: string;
    name?: string;
    updatedAt?: any;
    items?: number;
    total?: number;
    table?: string;
    docId?: string;
    channels: Array<string>;
    channel?: any;
    constructor(params?: object);
}
//# sourceMappingURL=dashboard-entries.d.ts.map