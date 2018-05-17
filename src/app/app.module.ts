import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DetailPageModule } from './detailPage/detailPage.module';
import { LoginPageModule } from './loginPage/loginPage.module';
import { ProductPageModule } from './productPage/productPage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DetailPageModule,
    LoginPageModule,
    ProductPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
