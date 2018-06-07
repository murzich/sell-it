import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { ProductItemComponent } from './product-item/product-item.component';
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
