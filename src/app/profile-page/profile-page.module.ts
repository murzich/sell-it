import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
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
