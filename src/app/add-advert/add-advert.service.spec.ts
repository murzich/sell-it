import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import ApiUrls from '../core/api-urls';
import { Advert, AdvertCreate } from '../core/models/advert.model';
import { AdvertImage } from '../core/models/image.model';
import { AddAdvertService } from './add-advert.service';

describe('AddAdvertService testing', () => {
  let service: AddAdvertService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AddAdvertService,
      ],
    });

    service = TestBed.get(AddAdvertService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can test AddAdvertService.postAdvWithImages$ w/o Images', () => {
    const testUrl = ApiUrls.adverts;
    const testData: AdvertCreate = {theme: 'Test'};
    const testRes: Advert = {theme: 'Test', id: 2, images: []};
    const testImgs: AdvertImage[] = [];

    service.postAdvWithImages$(testData, testImgs)
      .subscribe(data =>
        expect(data).toBe(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(testRes);
  });
});
