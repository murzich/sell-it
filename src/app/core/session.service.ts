import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  get getProfileFromApi$(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(ApiUrls.profile).pipe(
      map(res => this.userProfile = res)
    );
  }
}
