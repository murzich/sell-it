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

  private adaptResponse(): OperatorFunction<any, AdvertFull[]> {
    return map( (response: any) => {
      const results: AdvertFull[] = [];
      this.nextPage = response.next;
      response.results.forEach(item => results.push(new AdvertFull(item)));
      return results;
    });
  }
}
