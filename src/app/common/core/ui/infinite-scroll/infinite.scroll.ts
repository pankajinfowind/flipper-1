import { Input, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export abstract class InfiniteScroll implements OnInit {
    @Input() threshold: number | string = 30;

    protected abstract el: ElementRef;

    ngOnInit() {
        fromEvent(this.el.nativeElement, 'scroll', {capture: true})
            .pipe(debounceTime(20))
            .subscribe((e: Event) => this.onScroll(e.target as HTMLElement));
    }

    protected onScroll(target: HTMLElement) {
        if ( ! this.canLoadMore() || this.isLoading()) return;

        const offset = parseInt(this.threshold as string);

        if (target.scrollTop + target.offsetHeight >= target.scrollHeight - offset) {
            this.loadMoreItems();
        }
    }

    protected abstract loadMoreItems();
    protected abstract canLoadMore(): boolean;
    protected abstract isLoading(): boolean;
}
