import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../login.model';
import { emailValidator, valuesEquality } from '../validators-form-controls';
import {AuthService} from '../../core/auth.service';
import {tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model = new LoginModel();
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
      [
        valuesEquality('password', 'passwordConfirm')
      ])
  });

  constructor(private auth: AuthService) { }

  get email(): FormControl { return this.loginForm.get('email') as FormControl; }
  get password(): FormControl { return this.loginForm.get(['passwordGroup', 'password']) as FormControl; }
  get passwordConfirm(): FormControl { return this.loginForm.get(['passwordGroup', 'passwordConfirm']) as FormControl; }
  get passwordGroup(): FormGroup { return this.loginForm.get('passwordGroup') as FormGroup; }

  ngOnInit() {
  }

  /**
   * TODO: Mock submission method
   * Form submission.
   **/
  onSubmit(): void {
    if (this.alreadyRegistered) {
      console.log('login', this.loginForm.value);
      this.auth.login(this.loginForm.value)
        .subscribe(
          data => console.log(data)
        );
    } else {
      console.log('register', this.loginForm.value);
      this.auth.register(this.loginForm.value)
        .pipe(
          tap(data => console.log(data))
        )
        .subscribe();
    }
    this.loginForm.reset();
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
      default:
        break;
    }
  }
}