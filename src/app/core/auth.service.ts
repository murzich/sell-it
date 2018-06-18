import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';
import { LoginFormModel, RegistrationFormModel } from '../login-page/login.model';

import ApiUrls from './api-urls';

import { ApiLoginResponse } from './models/api-response';
import { UserCredentialsLoginModel, UserCredentialsRegisterModel } from './models/user.model';
import { SessionService } from './session.service';

/**
 * Provides methods for authentication & app access
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Variable for keeping url of forbidden page to redirect to it after login
   */
  redirectUrl: string;

  constructor(private httpApi: HttpClient, public router: Router, private sessionService: SessionService) {
  }

  get hasToken(): boolean {
    return this.sessionService.token !== undefined;
  }

  /**
   * Perform HTTP request to API login url.
   * On successful response writes payload returned by backend to {@link SessionService}
   * On errors - throws them into {@link handleError}
   * @param userData - User credentials from LoginForm
   * @return {Observable<any>}
   */
  login(userData: LoginFormModel): Observable<ApiLoginResponse> {
    const user = new UserCredentialsLoginModel(userData);
    return this.httpApi.post<ApiLoginResponse>(ApiUrls.login, user)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.sessionService.token = response.token;
          this.sessionService.userProfile = response.user;
        })
      );
  }

  /**
   * Perform HTTP request to API backend with Google access token for obtain user's rights
   * @param access_token
   * @return {Observable<Object>}
   */
  loginByGoogle(access_token) {
    const body = { access_token };
    return this.httpApi.post(ApiUrls.googleAuth, body);
  }

  /**
   * Used for redirecting to previously forbidden requested url after obtaining appropriate rights
   * @return {() => void}
   * @see redirectUrl
   * @see AuthService
   */
  redirectOnSubscribe() {
    return (): void => {
      if (this.hasToken) {
        const redirect = this.redirectUrl ? this.redirectUrl : '/product';
        this.router.navigate([redirect]);
      }
    };
  }

  /**
   * Perform HTTP request to API register url.
   * On successful response writes payload returned by backend to {@link SessionService}
   * On errors - throws them into {@link handleError}
   * @param userData - User credentials from LoginForm
   * @return {Observable<any>}
   */
  register(userData: RegistrationFormModel): Observable<ApiLoginResponse> {
    const user = new UserCredentialsRegisterModel(userData);
    return this.httpApi.post<ApiLoginResponse>(ApiUrls.register, user)
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.sessionService.token = response.token;
          this.sessionService.userProfile = response.user;
        })
      );
  }

  /**
   * Used for verification user's email by transferring key received in confirmation email
   * @param key
   * @return {Observable<Object>}
   */
  verifyEmail(key: {key: string}) {
    return this.httpApi.post(ApiUrls.verifyEmail, key);
  }

  // TODO: took from Angular.io
  /**
   * HTTP errors logger & modifies received data into clean error object
   * @param {HttpErrorResponse} error
   * @return {Observable<never>}
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }
}
