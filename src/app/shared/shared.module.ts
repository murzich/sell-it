import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './directives/infiniteScroll/infiniteScroll.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    InfiniteScrollDirective,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    InfiniteScrollDirective,
    HeaderComponent,
    FooterComponent
  ],
  providers: []
})
export class SharedModule { }
