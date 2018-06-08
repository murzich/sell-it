import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AdvertFull } from './models/advert.model';
import { AdvertService } from './advert.service';

@Injectable({
  providedIn: 'root'
})
export class AdvertResolverService implements Resolve<AdvertFull> {

  constructor(private advertService: AdvertService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdvertFull> {
    const id = +route.params['id'];
    return this.advertService.readAdvert(id);
  }
}
