import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../login.model';
import { PasswordConfirmValidator } from './password-confirm-validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  model = new LoginModel();
  signUpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    // TODO: create new FormGroup for passwords
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
// TODO: make validator, that takes options in array of formControl symbols;
  });

  constructor() { }

  get email(): FormControl { return this.signUpForm.get('email') as FormControl; }
  get password(): FormControl { return this.signUpForm.get('password') as FormControl; }
  get passwordConfirm(): FormControl { return this.signUpForm.get('passwordConfirm') as FormControl; }

  ngOnInit() {
  }

  /**
   * TODO: Mock submission method
   * Form submission.
   **/
  onSubmit() {
    console.log('value', this.signUpForm.value);
    this.signUpForm.reset();
  }
}
