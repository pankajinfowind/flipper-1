import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { SocialAuthService } from '../social-auth.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../current-user';
import { Bootstrapper } from '../../core/bootstrapper.service';
import { Settings } from '../../core/config/settings.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {


    constructor() { }
    @Input() label = 'login';
    @Input() token = '';
    @Input() appname = 'Yegobox';
    @Input() redirecturl = '/home';
    @Output() action = new EventEmitter<any>();
    user = {};
    next_step = false;
    rest_password = false;
    checkChanges($event) {

        this.user = $event.user;
        this.next_step = $event.next_step;
        this.rest_password = $event.rest_password;

    }

    ngOnInit() {
    }

}
