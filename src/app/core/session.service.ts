import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import ApiUrls from './api-urls';

import { UserProfile } from './models/user.model';

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

  get userProfile(): UserProfile {
    if (localStorage.userProfile !== undefined) {
      return new UserProfile(JSON.parse(localStorage.userProfile));
    } else {
      return null;
    }
  }

  set userProfile(userData: UserProfile) {
    if (userData !== null) {
      localStorage.userProfile = JSON.stringify(userData);
    } else {
      localStorage.removeItem('userProfile');
    }
  }

  get getProfileFromApi$(): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiUrls.profile).pipe(
      map(res => this.userProfile = res)
    );
  }
}
