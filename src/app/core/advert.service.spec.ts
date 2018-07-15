import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { AdvertService } from './advert.service';
import ApiUrls from './api-urls';
import {AdvertFull} from './models/advert.model';

describe('AdvertService', () => {
  let service: AdvertService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdvertService]
    });
    // inject the service
    service = TestBed.get(AdvertService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should return the json', () => {
    const mockAdvert = {
          owner: {},
          price: 15,
          text: 'mock-text',
        };

    service.getAdverts().subscribe(data => {
      expect(data[0]).toEqual(mockAdvert as AdvertFull);
    });
// Use predicate fn for test containing string
    const req = httpMock.expectOne(`${ApiUrls.adverts}?limit=12&offset=0`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      results: [mockAdvert]
    });
  });

  // it('should be created', inject([AdvertService], (service: AdvertService) => {
  //   expect(service).toBeTruthy();
  // }));
});
