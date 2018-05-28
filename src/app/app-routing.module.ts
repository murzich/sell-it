import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'login', loadChildren: './loginPage/loginPage.module#LoginPageModule'},
  {path: 'product', loadChildren: './productPage/productPage.module#ProductPageModule'},
  {path: 'detail', loadChildren: './detailPage/detailPage.module#DetailPageModule'},
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
