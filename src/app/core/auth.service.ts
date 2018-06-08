import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import ApiUrls from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpApi: HttpClient) { }

  login(userData: any): Observable<any> {
    // TODO: Mapping from form
    const user = {
      email: userData.email,
      password: userData.passwordGroup.password,
    };
    console.log(user);
    return this.httpApi.post(ApiUrls.login, user)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }

  register(userData: any): Observable<any> {
    // TODO: Mapping from form
    const user = {
      // TODO: mock
      username: 'testUser',
      email: userData.email,
      password1: userData.passwordGroup.password,
      password2: userData.passwordGroup.passwordConfirm,
    };
    console.log(user);
    return this.httpApi.post(ApiUrls.register, user)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }
}
