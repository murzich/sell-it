import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angular5-social-login';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth-intreceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("837694048230-keo53o03s8od9ee39boib7o6prp18fs5.apps.googleusercontent.com")
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CookieModule.forRoot(),
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
