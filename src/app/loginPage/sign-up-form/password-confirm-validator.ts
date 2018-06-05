import { AbstractControl } from '@angular/forms';

// taken from https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2

// TODO: Temporary Validator - make it like in:
/* export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
 *   return (control: AbstractControl): {[key: string]: any} => {
 *     const forbidden = nameRe.test(control.value);
 *     return forbidden ? {'forbiddenName': {value: control.value}} : null;
 *   };
 * }
 **/
export class PasswordConfirmValidator {
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('passwordConfirm').value;
    if (password !== confirmPassword) {
      AC.get('passwordConfirm').setErrors( {MatchPassword: true} );
    } else {
      AC.get('passwordConfirm').setErrors(null);
    }
  }
}
