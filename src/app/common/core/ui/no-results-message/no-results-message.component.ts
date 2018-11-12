import {Component, ViewEncapsulation} from '@angular/core';
import {Settings} from '../../config/settings.service';

@Component({
    selector: 'no-results-message',
    templateUrl: './no-results-message.component.html',
    styleUrls: ['./no-results-message.component.scss'],
    host: {class: 'no-results-message'},
    encapsulation: ViewEncapsulation.None,
})
export class NoResultsMessageComponent {
    constructor(public settings: Settings) {}
}
