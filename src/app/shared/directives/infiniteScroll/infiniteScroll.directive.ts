import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  private crossbarDelta: number;
  private crossbar: number;
  constructor() {
    console.log('infiniteScroll Class created.');
    this.crossbarDelta = 150;
    this.crossbar = document.body.offsetHeight - window.innerHeight - this.crossbarDelta;
  }
  @HostListener('window:resize')
  public onResize() {
    this.crossbar = document.body.offsetHeight - window.innerHeight - this.crossbarDelta;
  }
  @HostListener('window:scroll')
  public onScroll() {
    if (window.scrollY > this.crossbar) {
      console.log(window.scrollY);
    }
  }
}
