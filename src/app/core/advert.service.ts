import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Advert, AdvertFull } from './advert.model';
import { OperatorFunction } from 'rxjs';

@Injectable()
export class AdvertService {
  private urlAPI: string;
  private params: any;
  public nextPage: string | null;

  constructor(private http: HttpClient) {
    this.urlAPI = 'http://light-it-04.tk/api/adverts/';
    this.params = {
      'limit': '12',
      'offset': '0'
    };
  }

  public getAdverts() {
    return this.http.get(this.urlAPI, {params: this.params})
      .pipe(this.adaptResponse());
  }
  public getNext(offset: number) {
    this.params.offset = (this.params.limit * offset).toString();
    return this.http.get(this.urlAPI, {params: this.params})
      .pipe(this.adaptResponse());
  }
  private adaptResponse(): OperatorFunction<any, Advert[]> {
    return map( (response: any) => {
      const results: Advert[] = [];
      this.nextPage = response.next;
      response.results.forEach(item => results.push(new Advert(item)));
      return results;
    });
  }
  public readAdvert(id) {
    return this.http.get(`${this.urlAPI}${id}`)
      .pipe(
        map( (response: any) => new AdvertFull(response) )
      );
  }
}
