import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import { Settings } from '../../config/settings.service';
import {CurrentUser} from '../../../auth/current-user';

@Component({
    selector: 'material-navbar',
    templateUrl: './material-navbar.component.html',
    styleUrls: ['./material-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MaterialNavbar {
    @Input() menuPosition: string;
    @Input() showToggleButton = false;
    @Input() container = false;
    @Input() showAuthButtons = false;

    @Output() toggleButtonClick = new EventEmitter();
    
    constructor(
        public config: Settings,
        public currentUser: CurrentUser,
    ) {}
}
