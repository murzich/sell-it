import { inject, TestBed } from '@angular/core/testing';
import { AdvertResolverService } from './advert-resolver.service';
import { AdvertService } from './advert.service';

describe('AdvertResolverService', () => {
  let service: AdvertResolverService;
  let advertServiceSpy: jasmine.SpyObj<AdvertService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AdvertService', ['readAdvert']);
    TestBed.configureTestingModule({
      providers: [
        AdvertResolverService,
        {provide: AdvertService, useValue: spy},
      ]
    });
    // injects the service
    service = TestBed.get(AdvertResolverService);
    advertServiceSpy = TestBed.get(AdvertService);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should be created', inject([AdvertResolverService], (serviceAnother: AdvertResolverService) => {
    expect(serviceAnother).toBeTruthy();
  }));
});
