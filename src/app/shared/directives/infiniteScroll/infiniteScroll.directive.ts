import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  private crossbar: number;
  @Input() crossbarDelta: number = 150;
  @Input() goScroll: boolean;
  @Output() reachedBottom = new EventEmitter<any>();
  constructor() {
    this.onResize();
  }
  @HostListener('window:resize')
  public onResize() {
    this.crossbar = document.body.offsetHeight - window.innerHeight - this.crossbarDelta;
  }
  @HostListener('window:scroll')
  public onScroll() {
    this.onResize();
    if (window.scrollY > this.crossbar && this.goScroll) {
      this.reachedBottom.emit();
    }
  }
}
