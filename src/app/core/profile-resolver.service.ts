import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserProfileModel } from './models/user.model';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<UserProfileModel> {

  constructor(private profileService: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot)
    : Observable<UserProfileModel> | Promise<UserProfileModel> | UserProfileModel {
    return this.profileService.profile$
      .pipe(
        take(1),
      );
  }
}
