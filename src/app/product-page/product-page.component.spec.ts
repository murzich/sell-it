import { HttpErrorResponse } from '@angular/common/http';
import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdvertService } from '../core/advert.service';

import { ProductPageComponent } from './product-page.component';

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent { }

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent { }

@Component({selector: 'app-button-to-top', template: ''})
class ButtonToTopStubComponent { }

@Component({selector: 'app-product-item', template: ''})
class ProductItemStubComponent {
  @Input() id: number;
  @Input() image: string;
  @Input() name: string;
}

// TODO: Simplify StubDirective
@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollStubDirective {
  @Input() crossbarDelta: number;
  @Input() goScroll: boolean;
  @Output() reachedBottom = new EventEmitter<any>();

  @HostListener('onclick') onClick() {
    this.reachedBottom.emit();
  }
}

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let advertService: jasmine.SpyObj<AdvertService>;
  const sampleAdvert = {
    id: 2,
    images: [],
    theme: 'Test Theme'
  };

  beforeEach(async(() => {
    const advertStubService = jasmine.createSpyObj('AdvertService', [
      'getAdverts',
      'getNext',
      'nextPage',
    ]);

    TestBed.configureTestingModule({
      declarations: [
        ProductPageComponent,
        HeaderStubComponent,
        FooterStubComponent,
        ProductItemStubComponent,
        ButtonToTopStubComponent,
        InfiniteScrollStubDirective,
      ],
      providers: [
        { provide: AdvertService, useValue: advertStubService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    advertService = TestBed.get(AdvertService);
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;

    // advertService.getAdverts.and.returnValue(of());
    advertService.getNext.and.returnValue(of([sampleAdvert]));
    advertService.nextPage.and.returnValue('of([sampleAdvert])');
    // fixture.detectChanges();
  });

  it('should create', () => {
    advertService.getAdverts.and.returnValue(of());
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should get adverts from AdvertService', () => {
    advertService.getAdverts.and.returnValue(of([sampleAdvert]));

    component.ngOnInit();

    expect(component.adverts).toEqual([sampleAdvert]);
    expect(advertService.getAdverts).toHaveBeenCalledTimes(1);
  });

  it('should console.log error and keep empty adverts', () => {
    advertService.getAdverts.and.returnValue(throwError(new HttpErrorResponse({ error: 'test error', status: 404 })));

    component.ngOnInit();

    expect(component.adverts).toEqual(undefined);
    expect(advertService.getAdverts).toHaveBeenCalledTimes(1);
  });
});
