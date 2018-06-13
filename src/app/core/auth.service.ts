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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  constructor(private httpApi: HttpClient, public router: Router, private sessionService: SessionService) {
  }

  get hasToken(): boolean {
    return this.sessionService.token !== undefined;
  }

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

  redirectOnSubscribe = (): void => {
    if (this.hasToken) {
      const redirect = this.redirectUrl ? this.redirectUrl : '/product';
      this.router.navigate([redirect]);
    }
  };

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

  verifyEmail(key: {key: string}) {
    return this.httpApi.post(ApiUrls.verifyEmail, key);
  }

  // TODO: took from Angular.io
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
