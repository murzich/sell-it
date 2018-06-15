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
  avatar?: string | null;
  /**
   * User color scheme
   * acceptable types:
   * '#RRGGBB'
   * 'rgb(rrr, ggg, bbb)'
   * 'rgba(rrr, ggg, bbb, opacity)'
   * 'hsl(hue, saturation, lightness)'
   * 'hsla(hue, saturation, lightness, alpha)'
   * */
  color_scheme?: string | null;
  email?: string;
  first_name?: string;
  id?: number;
  language?: string | null;
  last_name?: string;
  location?: { name: string } | null | string;
  username?: string;
}

export class UserProfile extends UserProfileModel {
  constructor(json: UserProfileModel) {
    super();
    this.avatar = json.avatar;
    this.color_scheme = json.color_scheme;
    this.email = json.email;
    this.first_name = json.first_name;
    this.id = json.id;
    this.language = json.language;
    this.last_name = json.last_name;
    this.username = json.username;
    if (typeof json.location === 'string') {
      this.location = {name: json.location};
    } else {
      this.location = json.location;
    }
  }
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
