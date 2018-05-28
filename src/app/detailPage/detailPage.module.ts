import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailPageRoutingModule } from './detailPage-routing.module';
import { DetailPageComponent } from './detailPage.component';
import { SharedModule } from '../shared/shared.module';
import { AdvertService } from '../core/advert.service';

@NgModule({
  declarations: [
    DetailPageComponent
  ],
  imports: [
    CommonModule,
    DetailPageRoutingModule,
    SharedModule
  ],
  exports: [
    DetailPageComponent
  ],
  providers: [AdvertService],
})
export class DetailPageModule { }
