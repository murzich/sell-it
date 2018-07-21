import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from '../../testing/stub-directives';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let titleEl: HTMLElement;
  let imageEl: HTMLImageElement;
  let linkDe: DebugElement;
  let routerLink: RouterLinkDirectiveStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductItemComponent,
        RouterLinkDirectiveStub,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    titleEl = fixture.debugElement
      .query(By.css('.product-item__title'))
      .nativeElement;
    imageEl = fixture.debugElement
      .query(By.css('.product-item__img'))
      .nativeElement;
    linkDe = fixture.debugElement
      .query(By.directive(RouterLinkDirectiveStub));
    routerLink = linkDe.injector.get(RouterLinkDirectiveStub);

    component.id = 88;
    component.name = 'TestName';
    component.image = '/assets/empty-img.bmp';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display bind values', () => {
    const expectedTitle = 'TestName - 89';
    expect(titleEl.innerText).toContain(expectedTitle);
    expect(imageEl.src).toContain('/assets/empty-img.bmp');
  });

  it('should navigate to routerLink on click', () => {
    expect(routerLink.navigatedTo).toBeNull();

    linkDe.triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/88');
  });
});
