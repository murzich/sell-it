import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
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
