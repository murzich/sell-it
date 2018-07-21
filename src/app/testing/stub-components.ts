import { Component, Directive, EventEmitter, Input, Output } from '@angular/core';

@Component({selector: 'app-header', template: ''})
export class HeaderStubComponent { }

@Component({selector: 'app-footer', template: ''})
export class FooterStubComponent { }

@Component({selector: 'app-button-to-top', template: ''})
export class ButtonToTopStubComponent { }

@Component({selector: 'app-product-item', template: ''})
export class ProductItemStubComponent {
  @Input() id: number;
  @Input() image: string;
  @Input() name: string;
}

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollStubDirective {
  @Input() crossbarDelta: number;
  @Input() goScroll: boolean;
  @Output() reachedBottom = new EventEmitter<any>();
}
