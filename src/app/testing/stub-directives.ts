import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollStubDirective {
  @Input() crossbarDelta: number;
  @Input() goScroll: boolean;
  @Output() reachedBottom = new EventEmitter<any>();
}

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
