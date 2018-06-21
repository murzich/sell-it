import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';

import ApiUrls from '../core/api-urls';

import { AdvertCreate, AdvertFull } from '../core/models/advert.model';
import { AdvertImage } from '../core/models/image.model';

// TODO: providedIn AddAdvertModule does not work
@Injectable()
export class AddAdvertService {

  constructor(private http: HttpClient) { }

  postAdvWithImages$(advert: AdvertCreate, images: AdvertImage[]): Observable<any> {
    return this.http.post<AdvertFull>(ApiUrls.adverts, advert)
      .pipe(
        switchMap((adv) => from(images)
          .pipe(
            concatMap( image =>
              this.http.post<AdvertImage>(`${ApiUrls.adverts}${adv.pk}/image/`, image)
            )
          ))
      );
  }
}
