import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserProfile } from './models/user.model';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<UserProfile> {

  constructor(private profileService: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot)
    : Observable<UserProfile> | Promise<UserProfile> | UserProfile {
    return this.profileService.profile$
      .pipe(
        take(1),
      );
  }
}
