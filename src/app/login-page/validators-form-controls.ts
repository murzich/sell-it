import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegEx = /^(\w|[-~?#[\]!$&(){}*+=])+@(\w|[-~?#[\]!$&(){}*+=])+\.(\w|[-~?#[\]!$&(){}*+=])+$/;
  const isEmailValid = emailRegEx.test(control.value);
  return isEmailValid ? null : {'emailInvalid': true};
}

export function valuesEquality(formControl0: string, formControl1: string): ValidatorFn {
  return (group: FormGroup): ValidationErrors | null => {
    return (group.get(formControl0).value !== group.get(formControl1).value) ? {'notEqual': true} : null;
  };
}
