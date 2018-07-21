import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { AdvertService } from '../core/advert.service';
import {
  ButtonToTopStubComponent,
  FooterStubComponent,
  HeaderStubComponent,
  ProductItemStubComponent,
} from '../testing/stub-components';
import { InfiniteScrollStubDirective } from '../testing/stub-directives';
import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let advertService: jasmine.SpyObj<AdvertService>;
  let itemDEs: DebugElement[];
  const sampleAdvert = {
    id: 2,
    images: [{file: '/assets/the-best-img.bmp'}],
    theme: 'Test Theme'
  };
  const expectAdvert = {
    id: sampleAdvert.id,
    name: sampleAdvert.theme,
    image: sampleAdvert.images[0].file || null,
  };
  const initResponse = [sampleAdvert, sampleAdvert];
  const httpError =  new HttpErrorResponse({
    error: 'test error',
    status: 404,
  });

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

    advertService.nextPage.and.returnValue('validString');
  });

  it('should create', () => {
    advertService.getAdverts.and.returnValue(of());
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('#getAdverts', () => {



    it('should get adverts', () => {
      advertService.getAdverts.and.returnValue(of(initResponse));

      component.ngOnInit();

      expect(component.adverts).toEqual(initResponse);
      expect(advertService.getAdverts).toHaveBeenCalledTimes(1);
      fixture.detectChanges();
    });

    it('should console.log error and keep empty adverts', () => {
      advertService.getAdverts.and.returnValue(throwError(httpError));

      component.ngOnInit();

      expect(component.adverts).toEqual(undefined);
      expect(advertService.getAdverts).toHaveBeenCalledTimes(1);
    });

    it('should cast adverts to ProductItemComponent', async(() => {
      const expectedCast = [expectAdvert, expectAdvert];
      advertService.getAdverts.and.returnValue(of(initResponse));
      fixture.detectChanges();

      itemDEs = fixture.debugElement.queryAll(By.css('main *'));
      const itemContexts = itemDEs.map(itemDE => ({...itemDE.context}));
      expect(itemContexts).toEqual(expectedCast);
    }));
  });

  describe('#getMoreAdverts', () => {
    const testPage = 33;
    const additionalResponse = [sampleAdvert];

    beforeEach(() => {
      advertService.getAdverts.and.returnValue(of(initResponse));
    });

    it('should return new chunk of adverts', () => {
      advertService.getNext.and.returnValue(of(additionalResponse));

      fixture.detectChanges();

      component.page = testPage;
      expect(component.isReadyToScroll).toBeTruthy();

      component.getMoreAdverts();
      fixture.detectChanges();

      itemDEs = fixture.debugElement.queryAll(By.css('main *'));
      expect(advertService.getNext).toHaveBeenCalled();
      expect(advertService.getNext.calls.mostRecent().args[0])
        .toBe(testPage);
      expect(itemDEs.length)
        .toBe(initResponse.length + additionalResponse.length);
      // on Observable completes
      expect(component.page).toBe(testPage + 1);
      expect(component.isReadyToScroll).toBeTruthy();
    });

    it('should console.log error and make isReadyToScroll false', () => {
      advertService.getNext.and.returnValue(throwError(httpError));

      fixture.detectChanges();

      component.page = testPage;
      expect(component.isReadyToScroll).toBeTruthy();

      component.getMoreAdverts();
      fixture.detectChanges();

      itemDEs = fixture.debugElement.queryAll(By.css('main *'));
      expect(advertService.getNext).toHaveBeenCalled();
      expect(advertService.getNext.calls.mostRecent().args[0])
        .toBe(testPage);
      expect(itemDEs.length).toBe(initResponse.length);
      // on Observable error
      expect(component.page).toBe(testPage);
      expect(component.isReadyToScroll).toBeFalsy();
    });
  });

  describe('infiniteScroll', () => {

    it('should take params', () => {
      spyOn(component, 'getMoreAdverts').and.stub();
      advertService.getAdverts.and.returnValue(of(initResponse));
      fixture.detectChanges();

      const infiniteScrollDE = fixture.debugElement
        .query(By.directive(InfiniteScrollStubDirective));
      const infiniteScroll = infiniteScrollDE.injector
        .get(InfiniteScrollStubDirective);

      expect(infiniteScroll.crossbarDelta).toBe(150);
      expect(infiniteScroll.goScroll).toBe(component.isReadyToScroll);
      expect(infiniteScroll.goScroll).toBe(component.isReadyToScroll);

      infiniteScrollDE.triggerEventHandler('reachedBottom', null);
      expect(component.getMoreAdverts).toHaveBeenCalledTimes(1);
    });
  });
});
