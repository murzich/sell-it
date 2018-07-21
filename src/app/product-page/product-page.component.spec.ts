import { Component, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
  // let advertService: jasmine.SpyObj<AdvertService>;
  let advertService: AdvertService;
  const sampleAdvert = {
    id: 2,
    images: [],
    theme: 'Test Theme'
  };

  beforeEach(async(() => {
    // const advertStubService = jasmine.createSpyObj('AdvertService', ['getAdverts', 'getNext', 'nextPage']);
    const advertStubService = {
      getAdverts: () => of([sampleAdvert]),
      getNext: () => of([sampleAdvert]),
      nextPage: 'url',
    };

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
    // advertService = TestBed.get(AdvertService);
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // advertService.getAdverts.and.returnValue(of([sampleAdvert]));
    // advertService.getNext.and.returnValue(of([sampleAdvert]));
    // advertService.nextPage.and.returnValue('of([sampleAdvert])');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
