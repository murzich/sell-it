import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './loginPage-routing.module';
import { LoginPageComponent } from './loginPage.component';
import { SharedModule } from '../shared/shared.module';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SignInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LoginPageComponent
  ],
  providers: []
})
export class LoginPageModule { }
