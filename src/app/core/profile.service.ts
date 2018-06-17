import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

import ApiUrls from './api-urls';

import { UserProfile } from './models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile = new BehaviorSubject(this.sessionProfile || <UserProfile>{});

  constructor(private sessionService: SessionService, private http: HttpClient) {
  }

  get profile$(): Observable<UserProfile> {
    if (this.sessionService.userProfile === null && this.sessionService.token !== undefined) {
      return this.sessionService.getProfileFromApi$
        .pipe(
          tap(res => this.profile.next(res)),
          switchMapTo(this.profile.asObservable())
        );
    }
    return this.profile.asObservable();
  }

  private get sessionProfile(): UserProfile {
    return this.sessionService.userProfile;
  }

  private set sessionProfile(profileData: UserProfile) {
    this.profile.next(new UserProfile(profileData));
    this.sessionService.userProfile = profileData;
  }

  putProfile$(profileData: UserProfile) {
    return this.http.put(ApiUrls.profile, profileData)
      .pipe(
        tap((res: UserProfile) => this.sessionProfile = res));
  }

  patchProfile$(profileData: UserProfile): Observable<UserProfile> {
    return this.http.patch(ApiUrls.profile, profileData)
      .pipe(
        tap((res: UserProfile) => this.sessionProfile = res)
      );
  }
}
