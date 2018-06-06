import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginModel } from '../login.model';
import { emailValidator, valuesEquality } from '../validators-form-controls';

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
        valuesEquality
      ])
  });

  constructor() { }

  get email(): FormControl { return this.signUpForm.get('email') as FormControl; }
  get password(): FormControl { return this.signUpForm.get(['passwordGroup', 'password']) as FormControl; }
  get passwordConfirm(): FormControl { return this.signUpForm.get(['passwordGroup', 'passwordConfirm']) as FormControl; }
  get passwordGroup(): FormGroup { return this.signUpForm.get('passwordGroup') as FormGroup; }

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
