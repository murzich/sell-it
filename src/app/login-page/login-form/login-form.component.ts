import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService as SocialAuthService, GoogleLoginProvider } from 'angular5-social-login';

import { AuthService } from '../../core/auth.service';
import { emailValidator, valuesEquality } from '../validators-form-controls';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  /**
   * Variable for displaying needed form in template
   * @type {boolean}
   */
  alreadyRegistered = false;
  /**
   * String variable for displaying right text in submit form button
   * @type {string}
   */
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

  /**
   * Getters for quickly accessing to FormControls in component template
   * @return {FormControl}
   */
  get email(): FormControl { return this.loginForm.get('email') as FormControl; }
  get password(): FormControl { return this.loginForm.get(['passwordGroup', 'password']) as FormControl; }
  get passwordConfirm(): FormControl { return this.loginForm.get(['passwordGroup', 'passwordConfirm']) as FormControl; }
  get passwordGroup(): FormGroup { return this.loginForm.get('passwordGroup') as FormGroup; }

  /**
   * Submits User Credentials to AuthService login or register into app.
   * If previously was redirected from forbidden page - redirect to it.
   * Handles errors by setting them to template & displaying like FormValidationErrors
   * @see AuthService.login
   * @see AuthService.redirectUrl
   */
  onSubmit(): void {
    if (this.alreadyRegistered) {
      this.auth.login(this.loginForm.value)
        .subscribe(
          this.auth.redirectOnSubscribe(),
          error => this.loginForm.setErrors(error)
        );
    } else {
      this.auth.register(this.loginForm.value)
        .subscribe(
          this.auth.redirectOnSubscribe(),
          error => this.loginForm.setErrors(error)
        );
    }
  }

  /**
   * Toggle between login & register forms.
   * suitable values: <code>"login" | "register"</code>, anything else will be ignored
   * @param {string} form - Type of form, which should display in template
   */
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

  /**
   * Represents login or register via Google or Facebook OAuth
   * @param socialPlatform - type of OAuth service: <code>"Google" | "Facebook"</code>
   * @see SocialAuthService
   */
  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      // socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        this.auth.loginByGoogle(userData.token)
          .subscribe(
            data => console.log('subscribe', data)
          );
      }
    );
  }
}
