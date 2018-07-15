import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { AdvertService } from './advert.service';
import ApiUrls from './api-urls';
import { AdvertFull } from './models/advert.model';

describe('AdvertService', () => {
  let service: AdvertService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdvertService]
    });
    // injects the service
    service = TestBed.get(AdvertService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should be created', inject([AdvertService], (service: AdvertService) => {
    expect(service).toBeTruthy();
  }));

  describe('.getAdverts()', () => {

  const checkUrl = (url) => (request: HttpRequest<any>): boolean => {
    return url.includes(request.url);
  };
  const testingUrl = ApiUrls.adverts;
  const mockJson = { results: [{
    owner: {},
    price: 15,
    text: 'mock-text',
    theme: '',
    id: 32,
  }]};
  const resultData = mockJson.results.map(advert => new AdvertFull(advert));


    it('should return the AdvertFull[]', () => {

      service.getAdverts().subscribe(data => {
        expect(data).toEqual(resultData);
      });

      const req = httpMock.expectOne(checkUrl(testingUrl), 'call to api');
      expect(req.request.method).toBe('GET');

      req.flush(mockJson);

      httpMock.verify();
    });

    it('can test for 404 error', () => {
      const emsg = 'deliberate 404 error';

      service.getAdverts().subscribe(
        data => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

      const req = httpMock.expectOne(checkUrl(testingUrl));

      // Respond with mock error
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';

      service.getAdverts().subscribe(
        data => fail('should have failed with the network error'),
        (error: HttpErrorResponse) => {
          expect(error.error.message).toEqual(emsg, 'message');
        }
      );

      const req = httpMock.expectOne(checkUrl(testingUrl));

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });

      // Respond with mock error
      req.error(mockError);
    });
  });
});
