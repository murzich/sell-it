import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const basePath = 'http://light-it-04.tk/api/';
const apiUrlRegister = basePath + 'registration/';
const apiUrlLogin = basePath + 'login/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpApi: HttpClient) { }

  register(userData: any) {
    // TODO: Mapping from form
    const user = {
      // TODO: mock
      username: 'testUser',
      email: userData.email,
      password1: userData.passwordGroup.password,
      password2: userData.passwordGroup.passwordConfirm,
    };
    console.log(user);
    return this.httpApi.post(apiUrlRegister, user);
  }

  login(userData: any) {
    // TODO: Mapping from form
    const user = {
      email: userData.email,
      password: userData.passwordGroup.password,
    };
    console.log(user);
    return this.httpApi.post(apiUrlLogin, user);
  }
}
