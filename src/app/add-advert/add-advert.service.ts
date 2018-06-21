import { Injectable } from '@angular/core';

import { AdvertCreate } from '../core/models/advert.model';

@Injectable({
  // TODO: providedIn AddAdvertModule does not work
  providedIn: 'root'
})
export class AddAdvertService {

  constructor() { }

  postAdvert(advert: AdvertCreate): void {
    console.log(advert);
  }
}
