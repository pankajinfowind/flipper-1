import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RequestExtraCredentialsModalComponent } from './request-extra-credentials-modal/request-extra-credentials-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '../core/ui/ui.module';
import { MaterialModule } from '../../material/material.module';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';
import { EmailVerifyComponent } from './login/email-verify/email-verify.component';
import { PasswordVerifyComponent } from './login/password-verify/password-verify.component';
import { SendResetPassLinkComponent } from './reset-password/send-reset-pass-link.component';


@NgModule({
    imports: [
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        MaterialModule,
        RouterModule
    ],
    exports: [RouterModule,
      LoginComponent,
      EmailVerifyComponent,
       PasswordVerifyComponent,
        RegisterComponent,
       ChangePasswordComponent,
       SendResetPassLinkComponent],
    declarations: [
        LoginComponent,
        EmailVerifyComponent,
         PasswordVerifyComponent,
          RegisterComponent,
         ChangePasswordComponent,
         SendResetPassLinkComponent,
        RequestExtraCredentialsModalComponent
    ],
    entryComponents: [RequestExtraCredentialsModalComponent]
})
export class AuthModule {}
