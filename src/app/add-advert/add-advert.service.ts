import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiUrls from '../core/api-urls';

import { AdvertCreate, AdvertFull } from '../core/models/advert.model';

// TODO: providedIn AddAdvertModule does not work
@Injectable()
export class AddAdvertService {

  constructor(private http: HttpClient) { }

  postAdvert(advert: AdvertCreate): Observable<AdvertFull> {
    console.log(advert);
    return this.http.post<AdvertFull>(ApiUrls.adverts, advert);
  }
}
