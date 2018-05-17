import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginPageComponent } from './loginPage.component';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    LoginPageComponent
  ],
  providers: []
})
export class LoginPageModule { }
