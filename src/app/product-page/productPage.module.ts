import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductPageRoutingModule } from './productPage-routing.module';
import { ProductPageComponent } from './productPage.component';
import { ProductItemComponent } from './productItem/productItem.component';
import { SharedModule } from '../shared/shared.module';
import { AdvertService } from '../core/advert.service';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    SharedModule
  ],
  exports: [
    ProductPageComponent
  ],
  providers: [AdvertService]
})
export class ProductPageModule { }
