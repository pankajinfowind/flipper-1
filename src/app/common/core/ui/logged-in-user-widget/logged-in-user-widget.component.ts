import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CurrentUser} from '../../../auth/current-user';

@Component({
    selector: 'logged-in-user-widget',
    templateUrl: './logged-in-user-widget.component.html',
    styleUrls: ['./logged-in-user-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoggedInUserWidgetComponent  {
    constructor(public currentUser: CurrentUser, public auth: AuthService) {}
}
