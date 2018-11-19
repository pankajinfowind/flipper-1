import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Translations} from '../translations/translations.service';
import {Settings} from '../config/settings.service';
import {filter, map, mergeMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    protected routeData: object;

    constructor(
        protected router: Router,
        protected title: Title,
        protected i18n: Translations,
        protected settings: Settings,
    ) {}

    public init() {
        this.bindToRouterEvents();
    }

    protected getTitle(data): string {
        switch (data.name) {
            case 'account-settings':
                return this.i18n.t('Account Settings');
            case 'user':
                return data.user.display_name;
            case 'search':
                return this.i18n.t('Search');
            default:
                return this.getDefaultTitle();
        }
    }

    protected getDefaultTitle() {
        return this.settings.get('branding.site_name');
    }

    protected bindToRouterEvents() {
        this.router.events
            .pipe(
                filter(e => e instanceof NavigationEnd),
                map(() => {
                    let route = this.router.routerState.root;
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(data => {
                this.routeData = data;
                this.title.setTitle(this.getTitle(data));
            });
    }
}
