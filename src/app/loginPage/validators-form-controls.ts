import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegEx = /^(\w|[-~?#[\]!$&(){}*+=])+@(\w|[-~?#[\]!$&(){}*+=])+\.(\w|[-~?#[\]!$&(){}*+=])+$/;
  const isEmailValid = emailRegEx.test(control.value);
  return isEmailValid ? null : {'emailInvalid': true};
}

export function valuesEquality(group: FormGroup): ValidationErrors | null {
  // TODO: Hardcoded FormControl Names
  return (group.get('password').value !== group.get('passwordConfirm').value) ? {'notEqual': true} : null;
}
