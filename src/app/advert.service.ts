import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Advert } from './advert.model';

@Injectable()
export class AdvertService {

  constructor(private http: HttpClient) { }

  public getAdverts() {
    return this.http.get('/assets/adverts.json')
      .pipe(
        map((response => {
          let results: Advert[] = [];
          (<Array>response).forEach(item => results.push(new Advert(item)));
          return results;
        }))
      );
  }
  // TODO: mock getResponse for next batch of Adverts;
  public getMore12(adverts: Advert[]) {
    adverts.push(...adverts.slice(0, 12));
  }
}
