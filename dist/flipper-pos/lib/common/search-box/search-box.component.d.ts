import { OnInit, ElementRef, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Variant } from '@enexus/flipper-components';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
export declare class SearchBoxComponent implements OnInit, AfterViewInit {
    private cd;
    constructor(cd: ChangeDetectorRef);
    set foundVariant(value: Variant[]);
    get foundVariant(): Variant[];
    private userClosedModel;
    set didUserCloseModel(bol: boolean);
    get didUserCloseModel(): boolean;
    searchEmitValue: EventEmitter<string>;
    addToCartEmit: EventEmitter<any>;
    searchControl: FormControl;
    private debounce;
    loading: boolean;
    event: KeyboardEvent;
    isSearching: boolean;
    searchInputElement: ElementRef;
    private canfoundVariant;
    autoComplete: MatAutocompleteTrigger;
    currency: string;
    onKeydownHandler(event: KeyboardEvent): void;
    close(): void;
    timer: any;
    startSearching(event: any): void;
    searching(query: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    addToCartOnGotSingleItem(variants: Variant[]): void;
    addToCart(variant: any): void;
    focusing(): void;
    clearSearchBox(): void;
}
//# sourceMappingURL=search-box.component.d.ts.map