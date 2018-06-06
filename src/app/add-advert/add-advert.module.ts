import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddAdvertComponent } from './add-advert.component';
import { AddAdvertRoutingModule } from './add-advert-routing.module';
import { SharedModule } from '../shared/shared.module';

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
  ]
})
export class AddAdvertModule { }
