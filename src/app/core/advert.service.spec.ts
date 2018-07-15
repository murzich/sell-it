import { HttpRequest } from '@angular/common/http';
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

  it('should return the json', () => {
    const testingUrl = ApiUrls.adverts;
    const mockJson = {
      owner: {},
      price: 15,
      text: 'mock-text',
      theme: '',
      id: 32,
    };
    const responseJson = new AdvertFull(mockJson);

    service.getAdverts().subscribe(data => {
      expect(data[0]).toEqual(responseJson);
    });

    const checkUrl = (url) => (request: HttpRequest<any>): boolean => {
      return url.includes(request.url);
    };
    const req = httpMock.expectOne(checkUrl(testingUrl), 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      results: [mockJson]
    });
  });
});
