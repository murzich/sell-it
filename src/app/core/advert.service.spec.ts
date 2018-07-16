import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdvertService } from './advert.service';

import ApiUrls from './api-urls';
import { AdvertFull } from './models/advert.model';

describe('AdvertService', () => {

  it('should be created', inject([AdvertService], (serviceAnother: AdvertService) => {
    expect(serviceAnother).toBeTruthy();
  }));

  let service: AdvertService;
  let httpMock: HttpTestingController;

  const checkUrl = (url) => (request: HttpRequest<any>): boolean => {
    return request.url.includes(url);
  };
  const testingUrl = ApiUrls.adverts;
  const mockJson = {
    results: [
      {
        owner: {},
        price: 15,
        text: 'mock-text',
        theme: '',
        id: 32,
        images: []
      }
    ],
    next: 'test-next'
  };
  const resultData = mockJson.results.map(advert => new AdvertFull(advert));

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

  describe('private .adaptResponse()', () => {

    it('should do nothing when empty project', () => {
      of().pipe(service.adaptResponse())
        .subscribe(
          (data) => {
            expect(data).toEqual([], 'result data wasn\'t empty');
            expect(service.nextPage).toBeUndefined();
          });
    });

    it('should set nexPage as "test-next"', () => {
      of({next: 'test-next'}).pipe(service.adaptResponse())
        .subscribe(
          (data) => {
            expect(data).toEqual([], 'result data isn\'t empty');
          }
        );
      expect(service.nextPage).toBe('test-next');
    });

    it('should set transform taken data', () => {
      of(mockJson).pipe(service.adaptResponse())
        .subscribe(
          (data) => {
            expect(data).toEqual(resultData, 'result data is wrong');
            expect(service.nextPage).toBe('test-next');
          }
        );
    });
  });

  describe('.getAdverts()', () => {

    it('should return the AdvertFull[]', () => {
      service.getAdverts().subscribe(data => {
        expect(data).toEqual(resultData);
      });

      const req = httpMock.expectOne(checkUrl(testingUrl), 'call to api');
      expect(req.request.method).toBe('GET');

      req.flush(mockJson);

      httpMock.verify();
    });

    it('should return nothing when empty', () => {
      service.getAdverts().subscribe(data => {
        expect(data).toEqual([]);
      });

      const req = httpMock.expectOne(checkUrl(testingUrl), 'call to api');
      expect(req.request.method).toBe('GET');

      req.flush({});

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

  describe('.readAdvert', () => {

    const testId = 8;

    it('should return the AdvertFull[]', () => {
      service.readAdvert(testId).subscribe(data => {
        expect(data).toEqual(resultData[0]);
      });

      const req = httpMock.expectOne(`${testingUrl}${testId}`, 'call to api');
      expect(req.request.method).toBe('GET');

      req.flush(mockJson.results[0]);

      httpMock.verify();
    });

    it('can test for 404 error', () => {
      const emsg = 'deliberate 404 error';

      service.readAdvert(testId).subscribe(
        data => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

      const req = httpMock.expectOne(`${testingUrl}${testId}`);

      // Respond with mock error
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';

      service.readAdvert(testId).subscribe(
        data => fail('should have failed with the network error'),
        (error: HttpErrorResponse) => {
          expect(error.error.message).toEqual(emsg, 'message');
        }
      );

      const req = httpMock.expectOne(`${testingUrl}${testId}`);

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
