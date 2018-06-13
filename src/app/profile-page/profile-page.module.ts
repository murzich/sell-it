import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    ProfilePageComponent,
  ],
  exports: [
    ProfilePageComponent,
  ]
})
export class ProfilePageModule {
}
