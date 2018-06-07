import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonToTopComponent } from './components/button-to-top/button-to-top.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll/infinite-scroll.directive';
import { ScrollToTopDirective } from './directives/scroll-to-top/scroll-to-top.directive';

@NgModule({
  declarations: [
    ButtonToTopComponent,
    FooterComponent,
    HeaderComponent,
    InfiniteScrollDirective,
    ScrollToTopDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ButtonToTopComponent,
    FooterComponent,
    HeaderComponent,
    InfiniteScrollDirective,
    ScrollToTopDirective
  ],
  providers: []
})
export class SharedModule { }
