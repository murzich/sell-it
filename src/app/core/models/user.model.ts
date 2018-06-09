import { LoginFormModel, RegistrationFormModel } from '../../login-page/login.model';
/**
 * Type of user returned by API
 * */
export class UserProfileModel {
  /**
   * User picture avatar
   * for update - POST or PATCH jpg, jpeg, png or gif file in base64
   * on GET - returns url string
   * */
  avatar: string | null;
  /**
   * User color scheme
   * acceptable types:
   * '#RRGGBB'
   * 'rgb(rrr, ggg, bbb)'
   * 'rgba(rrr, ggg, bbb, opacity)'
   * 'hsl(hue, saturation, lightness)'
   * 'hsla(hue, saturation, lightness, alpha)'
   * */
  color_scheme: string | null;
  email: string;
  first_name: string;
  id: number;
  language: string | null;
  last_name: string;
  location: {name: string} | null;
  username: string;
}

export class UserCredentialsRegisterModel {
  email: string;
  password1: string;
  password2: string;
  username?: string;

  constructor(formData: RegistrationFormModel) {
    this.email = formData.email;
    this.password1 = formData.passwordGroup.password;
    this.password2 = formData.passwordGroup.passwordConfirm;
    this.username = formData.username;
  }
}

export class UserCredentialsLoginModel {
  email: string;
  password: string;

  constructor(formData: LoginFormModel) {
    this.email = formData.email;
    this.password = formData.passwordGroup.password;
  }
}

/** Type of User currently used in the application */
export class User {
    id?: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    location?: string;
    color_scheme?: string;
    language?: string;

    constructor(json: any) {
      this.id = json.id;
      this.username = json.username;
      this.email = json.email;
      this.first_name = json.first_name;
      this.last_name = json.last_name;
      this.avatar = !json.avatar ? 'assets/img/default.png' : json.avatar;
      this.location = json.location;
      this.color_scheme = json.color_scheme;
      this.language = json.language;
    }
}
