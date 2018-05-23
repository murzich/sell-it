import { Directive } from '@angular/core';

@Directive({
  selector: '[appScrollToTop]',
  host: {
    '(click)': 'onClick()'
  }
})
export class ScrollToTopDirective {
  public onClick() {
    window.scroll({top: 0, behavior: 'smooth'});
  }
}
