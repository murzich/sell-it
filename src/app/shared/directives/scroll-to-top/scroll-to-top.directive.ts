import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollToTop]',
})
export class ScrollToTopDirective {

  @HostListener('click') onClick() {
    window.scroll({top: 0, behavior: 'smooth'});
  }
}
