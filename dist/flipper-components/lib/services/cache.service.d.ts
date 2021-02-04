export declare class LocalStorageSaveOptions {
    key: string;
    data: any;
    expirationMins?: number;
}
export declare class CacheService {
    constructor();
    save(options: LocalStorageSaveOptions): void;
    load(key: string): any;
    remove(key: string): void;
    cleanLocalStorage(): void;
}
//# sourceMappingURL=cache.service.d.ts.map