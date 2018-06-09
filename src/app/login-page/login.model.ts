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
