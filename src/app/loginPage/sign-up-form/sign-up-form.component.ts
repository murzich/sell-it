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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, [
    PasswordConfirmValidator.MatchPassword
  ]);
// TODO: make validator, that takes options in array of formControl symbols;
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.signUpForm);
  }
}
