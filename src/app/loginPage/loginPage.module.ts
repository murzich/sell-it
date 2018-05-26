import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginPageRoutingModule } from './loginPage-routing.module';
import { LoginPageComponent } from './loginPage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    SharedModule
  ],
  exports: [
    LoginPageComponent
  ],
  providers: []
})
export class LoginPageModule { }
