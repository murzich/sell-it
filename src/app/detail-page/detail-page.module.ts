import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailPageComponent } from './detail-page.component';
import { DetailPageRoutingModule } from './detail-page-routing.module';
import { SharedModule } from '../shared/shared.module';

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
})
export class DetailPageModule { }
