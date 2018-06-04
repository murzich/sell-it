import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageRoutingModule } from './loginPage-routing.module';
import { LoginPageComponent } from './loginPage.component';
import { SharedModule } from '../shared/shared.module';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SigninFormComponent,
    SignupFormComponent
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
