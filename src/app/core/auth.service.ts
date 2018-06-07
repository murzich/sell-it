import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const basePath = 'http://light-it-04.tk/api/';
const apiUrlRegister = basePath + 'registration/';
const apiUrlLogin = basePath + 'login/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpApi: HttpClient) { }

  login(userData: any) {
    // TODO: Mapping from form
    const user = {
      email: userData.email,
      password: userData.passwordGroup.password,
    };
    console.log(user);
    return this.httpApi.post(apiUrlLogin, user);
  }

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
}
