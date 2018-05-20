import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ProductPageComponent } from './productPage.component';
import { ProductItemComponent } from './productItem/productItem.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  exports: [
    ProductPageComponent
  ],
  providers: []
})
export class ProductPageModule { }
