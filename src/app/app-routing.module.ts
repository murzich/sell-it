import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvertResolverService } from './core/advert-resolver.service';
import { AuthGuard } from './core/auth-guard.service';
import { UnAuthGuard } from './core/unauth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: './login-page/login-page.module#LoginPageModule',
    canActivate: [UnAuthGuard],
  },
  {path: 'login', loadChildren: './login-page/login-page.module#LoginPageModule'},
  {path: 'product', loadChildren: './product-page/product-page.module#ProductPageModule'},
  {
    path: 'profile',
    loadChildren: './profile-page/profile-page.module#ProfilePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    loadChildren: './detail-page/detail-page.module#DetailPageModule',
    resolve: {advert: AdvertResolverService}
  },
  {path: 'new-advert', loadChildren: './add-advert/add-advert.module#AddAdvertModule', canActivate: [AuthGuard]},
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
