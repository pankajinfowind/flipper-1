import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocialAuthService } from '../social-auth.service';
import { CurrentUser } from '../current-user';
import { Router } from '@angular/router';
import { Settings } from '../../core/config/settings.service';
import { Toast } from '../../core/ui/toast.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ApiService } from '../../../api/api.service';
import { GlobalVariables } from '../../core/global-variables';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
    appname = 'Yegobox';
    password_hide = true;
    cfm_password_hide = true;
    signupForm: FormGroup;
    constructor(
        public socialAuth: SocialAuthService,
        private router: Router,
        private toast: Toast,
        private settings: Settings,
        private user: CurrentUser,
        private fb: FormBuilder,
        private api: ApiService,
        public dialog: MatDialog,
        public v: GlobalVariables,
        private auth: AuthService
    ) {
        this.v.loading = false;
        this.v.doesMatchPassword = false;
        this.v.errorMsg = '';
        this.v.webTitle('Sign Up - eNexus Accounts');
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            gender: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            password_confirmation: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            agree_term_condition: new FormControl(true),
            phone: new FormControl()
        });
    }
    get first_name() {
        return this.signupForm.get('first_name');
    }
    get last_name() {
        return this.signupForm.get('last_name');
    }
    get email() {
        return this.signupForm.get('email');
    }
    get gender() {
        return this.signupForm.get('gender');
    }
    get country() {
        return this.signupForm.get('country');
    }
    get password() {
        return this.signupForm.get('password');
    }
    get password_confirmation() {
        return this.signupForm.get('password_confirmation');
    }

    onAccountInfoSubmit() {
        this.v.doesMatchPassword = false;
        if (this.signupForm.valid) {
            if (
                this.signupForm.value.password !==
                this.signupForm.value.password_confirmation
            ) {
                this.v.doesMatchPassword = true;
                return;
            }
            this.v.loading = true;

            this.auth.register(this.signupForm.value).subscribe(
                response => {
                    this.v.loading = false;

                    if (this.settings.get('require_email_confirmation')) {
                        this.toast.open(
                            'We have sent you an email with instructions on how to activate your account.'
                        );
                    } else {
                        this.user.assignCurrent(response.data);
                        this.router.navigate([this.auth.getRedirectUri()]).then(() => {
                            this.v.webTitle('My box -Yegobox');
                            this.toast.open('Registered successfully.');
                        });
                    }
                },
                response => {
                    this.v.errors = response['messages'];
                    this.v.loading = false;
                }
            );
        }
    }
}
