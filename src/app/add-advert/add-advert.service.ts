import { Injectable } from '@angular/core';

import { AdvertFull } from '../core/models/advert.model';

@Injectable({
  // TODO: providedIn AddAdvertModule does not work
  providedIn: 'root'
})
export class AddAdvertService {

  constructor() { }

  postAdvert(advert: AdvertFull): void {
    console.log(advert);
  }
}
