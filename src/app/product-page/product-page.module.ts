import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdvertService } from '../core/advert.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductPageComponent,
  ],
  imports: [
    ProductPageRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductPageComponent
  ],
  providers: [AdvertService]
})
export class ProductPageModule { }
