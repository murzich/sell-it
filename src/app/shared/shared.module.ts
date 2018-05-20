import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopDirective } from './directives/scrollToTop/scrollToTop.directive';
import { ButtonToTopComponent } from './components/buttonToTop/buttonToTop.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ButtonToTopComponent,
    ScrollToTopDirective,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonToTopComponent,
    ScrollToTopDirective
  ],
  providers: []
})
export class SharedModule { }
