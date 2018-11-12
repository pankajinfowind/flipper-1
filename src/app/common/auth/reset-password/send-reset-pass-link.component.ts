import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { GlobalVariables } from '../global-variables';
import { ApiService } from '../../../api/api.service';

@Component({
    selector: 'app-send-reset-pass-link',
    templateUrl: './send-reset-pass-link.component.html',
    styleUrls: ['./send-reset-pass-link.component.css']
})
export class SendResetPassLinkComponent implements OnInit {
    @Input()
    user;
    sent = false;
    error = false;
    form;
    constructor(
        private auth: AuthService,
        public router: Router,
        public v: GlobalVariables,
        private fb: FormBuilder,
        private api: ApiService
    ) {
        this.v.webTitle('Reset Password - eNexus Accounts');
    }

    ngOnInit() {
        if (this.user) {
            this.form = this.fb.group({
                email: [
                    this.user ? this.user.email : '',
                    [Validators.required, Validators.email]
                ]
            });
        }
    }
    resend() {
        this.sent = false;
    }
    goToLogin() {
        window.location.reload();
    }
    sendResetEmail() {
        this.v.loading = true;
        this.sent = false;
        this.v.response = [];
        if (!this.form.valid) {
            alert('Invalid email!');
            return;
        }
        if (this.form.valid) {
            const data = { email: this.form.value.email };
            this.auth.sendPasswordResetLink(data).subscribe(
                res => {
                    this.v.loading = false;
                    if (res) {
                        this.sent = true;
                    }
                },
                _error => {
                    this.v.loading = false;
                    this.error = _error;
                }
            );
        }
    }
}
