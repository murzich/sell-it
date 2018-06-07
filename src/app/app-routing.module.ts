import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdvertResolverService } from './core/advert-resolver.service';

const routes: Routes = [
  {path: 'login', loadChildren: './login-page/loginPage.module#LoginPageModule'},
  {path: 'product', loadChildren: './product-page/productPage.module#ProductPageModule'},
  {path: 'detail/:id', loadChildren: './detail-page/detailPage.module#DetailPageModule', resolve: {advert: AdvertResolverService}},
  {path: 'new-advert', loadChildren: './add-advert/add-advert.module#AddAdvertModule'},
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
