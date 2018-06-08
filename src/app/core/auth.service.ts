import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

import ApiUrls from './api-urls';
import { LoginFormModel, RegistrationFormModel } from '../login-page/login.model';
import { ApiLoginResponse } from './models/api-response';
import { UserCredentialsLoginModel, UserCredentialsRegisterModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpApi: HttpClient) { }

  login(userData: LoginFormModel): Observable<ApiLoginResponse> {
    const user = new UserCredentialsLoginModel(userData);
    return this.httpApi.post<ApiLoginResponse>(ApiUrls.login, user)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }

  register(userData: RegistrationFormModel): Observable<ApiLoginResponse> {
    const user = new UserCredentialsRegisterModel(userData);
    return this.httpApi.post<ApiLoginResponse>(ApiUrls.register, user)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }
}
