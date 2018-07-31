import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { auditTime, debounceTime, filter, map, pairwise, startWith, withLatestFrom } from 'rxjs/operators';

@Directive({
  selector: '[appInfiniteObsScroll]'
})
export class InfiniteObsScrollDirective implements OnInit, OnDestroy {
  @Input() auditionTime = 500;
  @Input() crossbarDelta = 150;
  @Input() doEmitEvent: boolean;
  @Output() reachedBottom = new EventEmitter<any>();

  private mutationObserver: MutationObserver;
  private resizeDebounce = 200;
  private subscription: Subscription;
  readonly docEl: HTMLElement;
  readonly element: HTMLElement;

  constructor(private el: ElementRef) {
    this.docEl = document.documentElement;
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.mutationObserver = new MutationObserver(this.onMutation);

    this.subscription = this.scrollResize$().subscribe(
      () => this.reachedBottom.emit()
    );
    this.mutationObserver.observe(this.element, {
      childList: true,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * **Resize Event Listener**
   * Emits debounced `window.innerHeight` value when window was resize.
   * Emits initial `window.innerHeight` on start.
   * @return {Observable<number>} Observable with single value of current `window.innerHeight`.
   */
  private innerHeight$(): Observable<number> {
    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(this.resizeDebounce),
        map(() => window.innerHeight),
        // for enabling the emitting in next observables.
        startWith(window.innerHeight),
      );
  }

  /**
   * MutationObserver callback function.
   * Used when `document.body` doesn't contain enough items for scrolling it.
   * Fills the body by new elements while the scroll doesn't appear.
   * Then removes listener.
   */
  private onMutation = (): void => {
    // used arrow because this.reachedBottom is undefined in function declaration
    if (this.docEl.offsetHeight >= this.docEl.scrollHeight) {
      this.mutationObserver.disconnect();
    } else {
      this.reachedBottom.emit();
    }
  }

  /**
   * **Scroll Event Listener.**
   * Emits only scrollDown events throttled by interval from Input.
   * Used to determine current scroll position.
   * *Doesn't emit initial values.*
   * @return {Observable<number[]>} Observable with array of 2 items:
   * `0 - body.scrollTop, 1 - body.scrollHeight`.
   */
  private scrollDown$(): Observable<number[]> {
    return fromEvent(window, 'scroll')
      .pipe(
        map(() => this.docEl.scrollTop),
        pairwise(),
        filter(pos => pos[0] < pos[1]),
        map(pos => [pos[1], this.docEl.scrollHeight]),
        auditTime(this.auditionTime),
      );
  }

  /**
   * **Combined observable** from scrollDown$ & innerHeight$.
   * Emits onScroll event but also takes window.innerHeight from last resize event.
   * Emits only `true` when scroll allows to obtain new items.
   * @return {Observable<boolean>} Observable with `true` that emits
   * when context allow to call getNewItems function.
   */
  private scrollResize$(): Observable<boolean> {
    return this.scrollDown$().pipe(
      withLatestFrom(this.innerHeight$()),
      map((data) => {
        const [[scrollTop, scrollHeight], innerHeight] = data;
        return scrollHeight - scrollTop <= innerHeight + this.crossbarDelta;
      }),
      filter(onBottom => onBottom && this.doEmitEvent),
    );
  }
}
