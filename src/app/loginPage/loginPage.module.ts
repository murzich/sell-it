import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginPageComponent } from './loginPage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  exports: [
    LoginPageComponent
  ],
  providers: []
})
export class LoginPageModule { }
