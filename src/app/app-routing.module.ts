import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdvertResolverService } from './core/advert-resolver.service';

const routes: Routes = [
  {path: 'login', loadChildren: './loginPage/loginPage.module#LoginPageModule'},
  {path: 'product', loadChildren: './productPage/productPage.module#ProductPageModule'},
  {path: 'detail/:id', loadChildren: './detailPage/detailPage.module#DetailPageModule', resolve: {advert: AdvertResolverService}},
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
