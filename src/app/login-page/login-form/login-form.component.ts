import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService as SocialAuthService,
  GoogleLoginProvider
} from 'angular5-social-login';

import { AuthService } from '../../core/auth.service';
import { emailValidator, valuesEquality } from '../validators-form-controls';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  alreadyRegistered = false;
  submitButtonText = 'Sign Up';

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      emailValidator
    ]),
    passwordGroup: new FormGroup({
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
        ])
      },
      [valuesEquality('password', 'passwordConfirm')]
    )
  });

  constructor(private auth: AuthService, private socialAuthService: SocialAuthService) { }

  get email(): FormControl { return this.loginForm.get('email') as FormControl; }
  get password(): FormControl { return this.loginForm.get(['passwordGroup', 'password']) as FormControl; }
  get passwordConfirm(): FormControl { return this.loginForm.get(['passwordGroup', 'passwordConfirm']) as FormControl; }
  get passwordGroup(): FormGroup { return this.loginForm.get('passwordGroup') as FormGroup; }

  ngOnInit() { }

  onSubmit(): void {
    if (this.alreadyRegistered) {
      this.auth.login(this.loginForm.value)
        .subscribe(
          this.auth.redirectOnSubscribe,
          error => this.loginForm.setErrors(error)
        );
    } else {
      this.auth.register(this.loginForm.value)
        .subscribe(
          this.auth.redirectOnSubscribe,
          error => this.loginForm.setErrors(error)
        );
    }
  }

  switchForm(form: string): void {
    switch (form) {
      case 'login':
        this.alreadyRegistered = true;
        this.submitButtonText = 'Login';
        this.passwordGroup.clearValidators();
        this.passwordGroup.removeControl('passwordConfirm');
        break;
      case 'register':
        this.alreadyRegistered = false;
        this.submitButtonText = 'Sign Up';
        this.passwordGroup.setValidators(valuesEquality('password', 'passwordConfirm'));
        this.passwordGroup.addControl('passwordConfirm', new FormControl(''));
        break;
    }
  }


  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      // socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
      }
    );
  }


}
