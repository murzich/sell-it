import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DetailPageComponent } from './detailPage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DetailPageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  exports: [
    DetailPageComponent
  ],
  providers: [],
})
export class DetailPageModule { }
