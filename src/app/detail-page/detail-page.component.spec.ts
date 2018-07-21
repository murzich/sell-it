import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetailPageComponent } from './detail-page.component';

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent { }

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent { }

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;

  const ActivatedRouteStub = {
    data: of({
      advert: {
        owner: {},
        theme: 'test',
        price: 888,
        images: [],
        text: '',
      },
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailPageComponent,
        HeaderStubComponent,
        FooterStubComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteStub },
      ],
      // schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
