import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FooterStubComponent, HeaderStubComponent, } from '../testing/stub-components';

import { DetailPageComponent } from './detail-page.component';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;

  const ActivatedRouteStub = {
    data: of({
      advert: {
        owner: {
          first_name: 'Name',
          last_name: 'Surname',
          avatar: '/assets/img/default.png',
        },
        theme: 'test',
        price: 888,
        images: [
          {file: '/assets/img/default.png'}
          ],
        text: 'test-description',
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

  it('should display received data', () => {
    const sliderImg = fixture.nativeElement
      .querySelectorAll('.slider__img');
    const title = fixture.nativeElement
      .querySelector('.about__title');
    const vendor = fixture.nativeElement
      .querySelector('.vendor');
    const price = fixture.nativeElement
      .querySelector('.about__price');
    const description = fixture.nativeElement
      .querySelector('.about__description');
    const userImg = fixture.nativeElement
      .querySelector('.user__img');

    fixture.detectChanges();

    expect(sliderImg[0].src).toContain('/assets/img/default.png');
    expect(title.innerText).toContain('test');
    expect(vendor.innerText).toContain('Name Surname');
    expect(price.innerText).toContain('888');
    expect(description.innerText).toContain('test-description');
    expect(userImg.src).toContain('/assets/img/default.png');
  });
});
