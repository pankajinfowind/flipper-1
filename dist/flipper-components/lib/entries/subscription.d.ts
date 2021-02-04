export declare class Subscription {
    id: string;
    userId?: string;
    subscriptionType?: string;
    lastPaymentDate?: Date;
    nextPaymentDate?: Date;
    status?: string;
    didSubscribed?: boolean;
    createdAt: string;
    updatedAt: string;
    table: string;
    docId?: string;
    channels: Array<string>;
    channel?: string;
    constructor(params?: object);
}
//# sourceMappingURL=subscription.d.ts.map