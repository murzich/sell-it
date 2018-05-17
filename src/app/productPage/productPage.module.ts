import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ProductPageComponent} from './productPage.component';
import {ProductItemComponent} from './productItem/productItem.component';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ProductPageComponent
  ],
  providers: []
})

export class ProductPageModule { }
