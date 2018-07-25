import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserProfile } from './models/user.model';

/**
 * Service for storing authentication data & current user profile.
 * Token stores in cookies. UserProfile - in localStorage
 * @see clearSession
 * @see isLoggedIn$
 * @see isTokenExpired
 * @see token
 * @see userProfile
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * Subject for casting authorization state & handle it in dependent services or components.
   * Created here to minimize imports in neighbors.
   * for example, if it is created in AuthService, we should import Auth into
   * AuthInterceptor, Profile & Session services
   * @type {BehaviorSubject<boolean>}
   * @see SessionService
   */
  private loginStatus = new BehaviorSubject<boolean>(!!this.token && !this.isTokenExpired());

  constructor(private cookie: CookieService) {
  }

  /**
   * __Getter:__ return current state of the login status.
   * __Setter:__ Casts new value to Observable login status.
   * @param next {boolean} Next value of {@link isLoggedIn$} Observable
   * @return {boolean}
   * @see SessionService
   */
  set isLoggedIn(next: boolean) {
    this.loginStatus.next(next);
  }
  get isLoggedIn(): boolean {
    return this.loginStatus.value;
  }

  /**
   * Clears current session.
   * Removes {@link token} from cookies & {@link userProfile} from localStorage
   * @see SessionService
   */
  clearSession(): void {
    this.token = null;
    this.userProfile = null;
  }

  /**
   * Represents an observable of the current state of the session authorization status.
   * @return {Observable<boolean>}
   * @see isLoggedIn
   * @see SessionService
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  /**
   * Checks an expired date of the current JWT token
   * @return {boolean}
   * @see SessionService
   */
  // TODO: After adding expiration date into cookie this method isn't necessary
  isTokenExpired(): boolean {
    const token = this.token;
    if (token) {
      return Date.now() >= this.tokenExpDate(token).valueOf();
    }
    return false;
  }

  /**
   * Sets a new user session - token & userProfile.
   * userProfile should invoke at first, because localStorage should not
   * be empty when login status changes to true.
   * @param session - Session options returned from API on sign in.
   * @see SessionService
   * @see token
   * @see userProfile
   */
  setSession(session: {token: string; user: UserProfile}): void {
    this.userProfile = session.user;
    this.token = session.token;
  }

  /**
   * Authorization token
   * stored in cookies by {@link CookieService}.
   * For **clearing** stored in cookies token just assign <tt>null</tt> to it.
   * When cleared casts <code>false</code> into {@link loginStatus}
   * @param {string} cookieToken - token received form API after login. Puts into cookies
   * @return {string} current token stored in cookies
   * @see CookieService
   * @see SessionService
   * @see loginStatus
   */
  set token(cookieToken: string | null) {
    if (cookieToken !== null) {
      this.cookie.put('token', cookieToken, {
        expires: this.tokenExpDate(cookieToken)
      });
      this.loginStatus.next(true);
    } else {
      this.cookie.remove('token');
      this.loginStatus.next(false);
    }
  }
  get token(): string {
    return this.cookie.get('token');
  }

  /**
   * User's profile object
   * stored in {@link localStorage}
   * for clearing stored in localStorage User's profile object just assign <tt>null</tt> to it
   * @param {UserProfile} userData - new User's profile object. Puts into localStorage
   * @return {UserProfile} current User's profile object or <tt>null</tt>, if localStorage doesn't have it
   * @see SessionService
   */
  set userProfile(userData: UserProfile | null) {
    if (userData !== null) {
      localStorage.setItem('userProfile', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userProfile');
    }
  }
  get userProfile(): UserProfile {
    const userString = localStorage.getItem('userProfile');
    if (userString) {
      return new UserProfile(
        JSON.parse(userString)
      );
    } else {
      return null;
    }
  }

  /**
   * Returns an expiration date of an input token
   * @return {Date}
   * @param token {string} Token string obtained from server
   * @see SessionService
   */
  private tokenExpDate(token: string): Date {
    return new Date(
      JSON.parse(atob(token.split('.')[1])) * 1000
    );
  }
}
