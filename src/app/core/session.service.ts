import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import ApiUrls from './api-urls';
import { UserProfileModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookie: CookieService, private http: HttpClient) {
  }

  get token(): string {
    return this.cookie.get('token');
  }

  set token(cookieToken: string) {
    if (cookieToken !== null) {
      this.cookie.put('token', cookieToken);
    } else {
      this.cookie.remove('token');
    }
  }

  get userProfile(): UserProfileModel {
    if (localStorage.userProfile === undefined && !!this.token) {
      // TODO: async update, doesn't throw new data into next if statement
      this.http.get<UserProfileModel>(ApiUrls.profile)
        .subscribe(
          response => this.userProfile = response
        );
    }
    if (localStorage.userProfile !== undefined) {
      return JSON.parse(localStorage.userProfile);
    } else {
      return null;
    }
  }

  set userProfile(userData: UserProfileModel) {
    if (userData !== null) {
      localStorage.userProfile = JSON.stringify(userData);
    } else {
      localStorage.removeItem('userProfile');
    }
  }
}
