import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AdvertResolverService } from './advert-resolver.service';
import { AdvertService } from './advert.service';
import { AdvertFull } from './models/advert.model';

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

  it('should return an observable', () => {
    const testId = 2;
    const testObs = of(<AdvertFull>{id: testId});
    const routeFake = new ActivatedRouteSnapshot();
    routeFake.params = {id: testId};

    advertServiceSpy.readAdvert.and.returnValue(testObs);
    expect(service.resolve(routeFake, {} as RouterStateSnapshot))
      .toBe(testObs, 'service return "Observable"');
    expect(advertServiceSpy.readAdvert.calls.count())
      .toBe(1, 'called once');
    expect(advertServiceSpy.readAdvert.calls.mostRecent().returnValue)
      .toBe(testObs);
    expect(advertServiceSpy.readAdvert.calls.mostRecent().args[0])
      .toBe(testId, 'id is equal');
  });
});
