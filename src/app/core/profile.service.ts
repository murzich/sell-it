import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMapTo, tap } from 'rxjs/operators';

import ApiUrls from './api-urls';

import { UserProfile } from './models/user.model';
import { SessionService } from './session.service';

/**
 * Service for handling Profile of current user
 * @see profile$
 * @see putProfile$
 * @see patchProfile$
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  /**
   * BehaviorSubject for projecting current UserProfile object
   * @type {BehaviorSubject<UserProfile>}
   */
  private profile = new BehaviorSubject(this.sessionProfile || <UserProfile>{});

  constructor(private sessionService: SessionService, private http: HttpClient) {
    // Watch for change of login
    // TODO: Maybe would be better to flatten with profile$
    this.sessionService.isLoggedIn$
      .subscribe(
        isLoggedIn => {
          if (isLoggedIn) {
            this.profile.next(this.sessionProfile);
          } else {
            this.profile.next(<UserProfile>{});
          }
        }
      );
  }

  /**
   * Profile observable projects Profile object of current user for subscribers in components.
   * If authorization token exists but User's profile object is absent, gets new one from API.
   * Then throws received User's Profile to {@link profile} BehaviorSubject & switch to it's observable.
   * @return {Observable<UserProfile>}
   * @see profile
   * @see SessionService.userProfile
   * @see hasTokenWithoutProfile
   * @see getFreshProfile$
   */
  get profile$(): Observable<UserProfile> {
    if (this.hasTokenWithoutProfile()) {
      return this.getFreshProfile$();
    }
    return this.profile.asObservable();
  }

  /**
   * Produce PATCH method to API with partial edited User's Profile
   * If username was changed it is necessary to obtain new JWT token
   * On mediation throw edited User's Profile from HttpClient Observable
   * to {@link sessionProfile} and {@link SessionService.userProfile}
   * @param profileData
   * @return {Observable<UserProfile>}
   */
  patchProfile$(profileData: UserProfile): Observable<UserProfile> {
    return this.http.patch(ApiUrls.profile, profileData)
      .pipe(
        tap((res: UserProfile) => this.sessionProfile = res)
      );
  }

  /**
   * Produce PUT method to API with edited User's Profile
   * If username was changed it is necessary to obtain new JWT token
   * On mediation throw edited User's Profile from HttpClient Observable
   * to {@link sessionProfile} and {@link SessionService.userProfile}
   * @param {UserProfile} profileData
   * @return {Observable<UserProfile>}
   */
  putProfile$(profileData: UserProfile) {
    return this.http.put(ApiUrls.profile, profileData)
      .pipe(
        tap((res: UserProfile) => this.sessionProfile = res));
  }

  /**
   * ## Getter:
   * Gets UserProfile object currently stored in SessionStorage (in localStorage now)
   *  ## Setter:
   * Projects new instance of current UserProfile object into Profile BehaviorSubject
   * & stores it to SessionStorage (in localStorage now)
   * @private
   * @param profileData {UserProfile}
   * @return {UserProfile}
   * @see SessionService
   */
  private set sessionProfile(profileData: UserProfile) {
    this.profile.next(new UserProfile(profileData));
    this.sessionService.userProfile = profileData;
  }
  private get sessionProfile(): UserProfile {
    return this.sessionService.userProfile;
  }

  /**
   * Gets a fresh instance of the User profile from the backend & throws it
   * to the {@link profile} BehaviourSubject's next value.
   * Afterward switches to the observable given by the profile's BS.
   * @return {Observable<UserProfile>}
   * @see profile$
   */
  private getFreshProfile$(): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiUrls.profile)
      .pipe(
        map(res => {
          const userProfile = new UserProfile(res);
          this.profile.next(userProfile);
          this.sessionService.userProfile = userProfile;
          return userProfile;
        }),
        switchMapTo(this.profile.asObservable())
      );
  }

  /**
   * Condition for checking if the current session contains a user profile data & has a token.
   * @return {boolean}
   * @see profile$
   */
  private hasTokenWithoutProfile(): boolean {
    const session = this.sessionService;
    return session.userProfile === null && session.token !== undefined;
  }

}
