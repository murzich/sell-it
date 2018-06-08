import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { Advert, AdvertFull } from './advert.model';
import ApiUrls from './api-urls';

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
    return this.http.get(`${ApiUrls.adverts}/${id}`)
      .pipe(
        map( (response: any) => new AdvertFull(response) )
      );
  }

  private adaptResponse(): OperatorFunction<any, Advert[]> {
    return map( (response: any) => {
      const results: Advert[] = [];
      this.nextPage = response.next;
      response.results.forEach(item => results.push(new Advert(item)));
      return results;
    });
  }
}
