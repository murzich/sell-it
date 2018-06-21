import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddAdvertRoutingModule } from './add-advert-routing.module';

import { AddAdvertComponent } from './add-advert.component';
import { AddAdvertService } from './add-advert.service';

@NgModule({
  imports: [
    AddAdvertRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AddAdvertComponent,
  ],
  exports: [
    AddAdvertRoutingModule,
  ],
  providers: [
    AddAdvertService,
  ]
})
export class AddAdvertModule { }
