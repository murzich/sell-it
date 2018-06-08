export class LoginModel {
  constructor(
    email: string = '',
    password: string = ''
  ) {}
}

export interface LoginFormModel {
  email: string;
  passwordGroup: {
    password: string;
  };
}

export interface RegistrationFormModel extends LoginFormModel {
  passwordGroup: {
    password: string;
    passwordConfirm: string;
  };
  username?: string;
}
