import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() crossbarDelta = 150;
  @Input() goScroll: boolean;
  @Output() reachedBottom = new EventEmitter<any>();
  crossbar: number;

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize') onResize() {
    this.crossbar = document.body.offsetHeight - window.innerHeight - this.crossbarDelta;
  }

  @HostListener('window:scroll') onScroll() {
    this.onResize();
    if (window.scrollY > this.crossbar && this.goScroll) {
      this.reachedBottom.emit();
    }
  }
}
