import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { UserProfile } from './models/user.model';

/**
 * Service for storing authentication data & current user profile.
 * Token stores in cookies. UserProfile - in localStorage
 * @see clearSession
 * @see isTokenExpired
 * @see token
 * @see userProfile
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookie: CookieService) {
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
   * Checks an expired date of the current JWT token
   * @return {boolean}
   * @see SessionService
   */
  // TODO: After adding expiration date into cookie is not necessary
  isTokenExpired(): boolean {
    const token = this.token;
    if (token) {
      return Date.now() >= this.tokenExpDate(token).valueOf();
    }
    return false;
}

  /**
   * Authorization token
   * stored in cookies by {@link CookieService}
   * for clearing stored in cookies token just assign <tt>null</tt> to it
   * @param {string} cookieToken - token received form API after login. Puts into cookies
   * @return {string} current token stored in cookies
   * @see CookieService
   * @see SessionService
   */
  set token(cookieToken: string | null) {
    if (cookieToken !== null) {
      this.cookie.put('token', cookieToken, {
        expires: this.tokenExpDate(cookieToken)
      });
    } else {
      this.cookie.remove('token');
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
      localStorage.userProfile = JSON.stringify(userData);
    } else {
      localStorage.removeItem('userProfile');
    }
  }
  get userProfile(): UserProfile {
    if (localStorage.userProfile !== undefined) {
      return new UserProfile(JSON.parse(localStorage.userProfile));
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
      JSON.parse(atob(token.split('.')[1])).exp * 1000
    );
  }
}
