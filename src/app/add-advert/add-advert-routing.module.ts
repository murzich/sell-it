import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAdvertComponent } from './add-advert.component';

const routes: Routes = [
  {path: '', component: AddAdvertComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
})
export class AddAdvertRoutingModule { }
