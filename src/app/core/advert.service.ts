import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import ApiUrls from './api-urls';
import { AdvertFull } from './models/advert.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  nextPage: string | null;
  private params: any;

  constructor(private http: HttpClient) {
    this.params = {
      'limit': '12',
      'offset': '0'
    };
  }

  getAdverts() {
    return this.http.get(ApiUrls.adverts, {params: this.params})
      .pipe(this.adaptResponse());
  }

  getNext(offset: number) {
    this.params.offset = (this.params.limit * offset).toString();
    return this.http.get(ApiUrls.adverts, {params: this.params})
      .pipe(this.adaptResponse());
  }

  readAdvert(id: number): Observable<AdvertFull> {
    return this.http.get(`${ApiUrls.adverts}${id}`)
      .pipe(
        map( (response: any) => new AdvertFull(response) )
      );
  }

  /**
   * Returns the RxJs map operator with the handling function, which converts
   * a response into the entire app format & saves next pagination link.
   * @return {OperatorFunction<{results?: any; next?: any}, AdvertFull[]>}
   */
  private adaptResponse(): OperatorFunction<any, AdvertFull[]> {
    return map( ({ results = [], next = '' }) => {
      const adverts: AdvertFull[] = [];
      this.nextPage = next;
      results.forEach(item => adverts.push(new AdvertFull(item)));
      return adverts;
    });
  }
}
